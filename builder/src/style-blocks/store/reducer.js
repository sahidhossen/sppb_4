export const styleContextReducer = (state, { type, payload }) => {
    switch (type) {
      case "CHANGE_STYLE_ATTRIBUTES":
        return {
          ...state,
          name: payload,
        };
      default:
        return state;
    }
  };
  