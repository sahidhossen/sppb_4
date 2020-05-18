import { createStyleBlock, createStyleMap } from '../lib/styleHelper';

const commonReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_ADDON': {
        let {defaultAddon: addon } = action
        let {control} = state
          control.selector = {...state.control.selector, addonId: addon.id }
          control.pickedAddon = null
        return {...state, control: {...control} }
      }
      case 'SET_COMPUTED_ATTRIBUTE': {
        let {attributes, options} = action.payload;

        let nextState = {...state};
        // Update styleBlockStore 
        /**
         * Generate new blockId if css blockId not exists
         * Generate custom css from computed value
         * Update with block Id
         */
        let {blockStore, mapStore} = nextState.styleBlockStore;
        let styleBlockId = null;
        if(!options.blockId || options.blockId === null ) {

          let styleBlock = createStyleBlock(attributes, options)
          styleBlockId = styleBlock.id; 
          blockStore = {...blockStore, [styleBlockId]: styleBlock}

          // Update stylePropertyStore
          let styleMap = createStyleMap(attributes, options, styleBlockId)
          mapStore = {...mapStore, [styleBlockId]: styleMap}


          // Update AddonBlock
          let {present, past} = nextState.builder;
          past = [...past, present]; 
          let addon = present[options.addonId]; 
          addon = {...addon, styleBlockIds: [styleBlockId] }
          present[options.addonId] = addon; 
          let nextBuilder = {...nextState.builder, past, present}; 


          return {
            ...nextState, 
            builder: nextBuilder,
            styleBlockStore: {...nextState, blockStore, mapStore}
          }
        } else {
          // Pick current blockId update fields
        }

        

       

        return {...state};
      }
      default: 
        return state;  
    }
  }

export default commonReducer;