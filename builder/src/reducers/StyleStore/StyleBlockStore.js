let styleProperties = {
    color: 'rgba(0,0,0,0)',
    fontSize: '12px',
}

let ID = 'randomID';

const defaultBlock ={
    [ID]: {
        id: ID, 
        type: 'class|tag',
        class: '',
        namespace: '',
        selector: '',
        styless: {
            ...styleProperties
        },
        viewport: {
            main: { ...styleProperties },
            tablet: { ...styleProperties },
            mobile: { ...styleProperties }
        }
    }
} 

const styleBlockStore = (state={ type: 'block'}, action) => {
    switch (action.type) {
      case 'ADD_STYLE_BLOCK': {
        return {...state }
      }
      default: 
        return state;  
    }
  }

export default styleBlockStore;