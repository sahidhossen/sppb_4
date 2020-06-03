import defaultStyle from './defaultStyle';

const styleStore = (state= defaultStyle , action) => {
    switch (action.type) {
      case 'SET_COMPUTED_STYLE': {
        let nextState = action.payload;
        return {...nextState}
      }
      case 'SET_COMPUTED_ATTRIBUTE': {
        let { attributes } = action.payload;
        
        let nextState = {...state};

        let _attributes = {}; 

        let fields = Object.keys(attributes); 
        fields.map( field => {
          _attributes[field] = {...nextState[field], local: attributes[field] }
        })
        
        return {...nextState, ..._attributes}
      }
      default: 
        return state;  
    }
  }

export default styleStore;