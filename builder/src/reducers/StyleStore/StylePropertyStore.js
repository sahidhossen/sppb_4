const stylePropertyStore = (state={type: 'props'}, action) => {
    switch (action.type) {
      case 'ADD_STYLE_PROPERTY': {
        return {...state}
      }
      default: 
        return state;  
    }
  }

export default stylePropertyStore;