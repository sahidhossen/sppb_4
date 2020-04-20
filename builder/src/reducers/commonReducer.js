const commonReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_BLOCK': {
        let {defaultAddon: addon } = action
        let {control} = state
          control.selector = {...state.control.selector, addonId: addon.id }
        return {...state, control: {...control} }
      }
      default: 
        return state;  
    }
  }

export default commonReducer;