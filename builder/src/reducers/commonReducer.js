import {
  createStyleBlock,
  getStyleMap,
  getStyleMapProperty,
  createCssMarkup,
} from "../lib/styleHelper";

const commonReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ADDON": {
      let { defaultAddon: addon } = action;
      let { control } = state;
      control.selector = { ...state.control.selector, addonId: addon.id };
      control.pickedAddon = null;
      return { ...state, control: { ...control } };
    }

    case "SET_COMPUTED_ATTRIBUTE": {
      let { attributes, options } = action.payload;

      let nextState = { ...state };
      // Update styleBlockStore
      /**
       * Generate new blockId if css blockId not exists
       * Generate custom css from computed value
       * Update with block Id
       */
      let { blockStore, mapStore } = nextState.styleBlockStore;
      let styleBlockId = null;
      if (!options.blockId || options.blockId === null) {
        // Update styleBlockStore
        let styleBlock = createStyleBlock(options);
        styleBlockId = styleBlock.id;
        blockStore = { ...blockStore, [styleBlockId]: styleBlock };

        // Update stylePropertyStore
        let styleMap = getStyleMap(attributes, options, styleBlockId);
        mapStore = { ...mapStore, [styleBlockId]: styleMap };

        // Update AddonBlock
        let { present, past } = nextState.builder;
        past = [...past, present];
        let addon = present[options.addonId];
        addon = { ...addon, styleBlockIds: [styleBlockId] };
        present[options.addonId] = addon;
        let nextBuilder = { ...nextState.builder, past, present };
        console.log("nextbuilder: ", nextBuilder)
        return {
          ...nextState,
          builder: nextBuilder,
          styleBlockStore: {
            ...nextState.styleBlockStore,
            blockStore,
            mapStore,
          },
        };
      } else {
        // Update styleBlockStore
        let { blockId, viewport, styles } = options;

        let styleBlock = blockStore[blockId];

        let cssMarkup = createCssMarkup(styles);

        styleBlock = {
          ...styleBlock,
          variant: { ...styleBlock.variant, [viewport]: cssMarkup },
        };

        blockStore = { ...blockStore, [blockId]: styleBlock };

        // Update stylePropertyStore
        let styleMap = mapStore[blockId];
        let styleMapProperty = {
          ...styleMap[viewport],
          ...getStyleMapProperty(attributes),
        };
        mapStore = {
          ...mapStore,
          [blockId]: { ...styleMap, [viewport]: styleMapProperty },
        };

        return {
          ...nextState,
          styleBlockStore: {
            ...nextState.styleBlockStore,
            blockStore,
            mapStore,
          },
        };
      }
    }
    default:
      return state;
  }
};

export default commonReducer;
