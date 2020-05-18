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
        // Update styleBlockStore 
        /**
         * Generate new blockId if css blockId not exists
         * Generate custom css from computed value
         * Update with block Id
         */
        let {blockStore, mapStore} = state.styleBlockStore;

        if(!options.blockId || options.blockId === null ) {
          // Generate new blockId
          
        } else {
          // Pick current blockId update fields
        }
        console.log("store: ", options, attributes)

        // Update stylePropertyStore

        // Update AddonBlock

        return {...state};
      }
      default: 
        return state;  
    }
  }

export default commonReducer;