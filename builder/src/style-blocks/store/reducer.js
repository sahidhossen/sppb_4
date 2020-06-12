import { isObject } from 'lodash';

export const styleContextReducer = (state, { type, payload }) => {
    switch (type) {

        case "INITIATE_STYLE_STATE": {
            return {
                ...state, 
                ...payload
            }
        }

      case "CHANGE_STYLE_ATTRIBUTES":
        const { attributes, options } = payload;
        let { styleState, rule } = state; 

        rule = options.rule ? {...rule, ...options.rule } : rule; 

        let nextAttributes = {...styleState[options.componentKey] }; 

        let fields = Object.keys(attributes); 

        fields.map( field => {
            let nextvalue =  {...nextAttributes[field], value: isObject(attributes[field]) ? {...nextAttributes[field].value, ...attributes[field]} : attributes[field] }; 
            nextAttributes[field] = nextvalue;
        })
        return {
          ...state,
          styleState: {...styleState, [options.componentKey]: nextAttributes },
          rule
        };

      default:
        return state;
    }
  };
  