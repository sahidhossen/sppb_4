const commonReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_ADDON': {
        let {defaultAddon: addon } = action
        let {control} = state
          control.selector = {...state.control.selector, addonId: addon.id }
          control.pickedAddon = null
        return {...state, control: {...control} }
      }
      default: 
        return state;  
    }
  }

export default commonReducer;