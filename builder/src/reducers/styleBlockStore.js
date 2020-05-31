
const initialState = {
    blockStore: {}, 
    mapStore: {},
}

const styleBlockStore = (state= initialState , action) => {
    switch (action.type) {
      case 'UPDATE_STYLE_BLOCK': {
        // BLOCK STATE
        return {...state}
      }
      case 'UPDATE_STYLE_MAP': {
        // MAP STATE
        
        return {...state}
      }
      default: 
        return state;  
    }
  }

export default styleBlockStore;