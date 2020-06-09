export const styleContextReducer = (state, { type, payload }) => {
    switch (type) {

        case "INITIATE_STYLE_STATE": {
            return {
                ...state, 
                payload
            }
        }

      case "CHANGE_STYLE_ATTRIBUTES":
        return {
          ...state,
          name: payload,
        };
      default:
        return state;
    }
  };
  