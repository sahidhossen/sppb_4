import defaultStyle from "./defaultStyle";

const styleStore = (state = defaultStyle, action) => {
  switch (action.type) {
    case "SET_COMPUTED_STYLE": {
      let nextState = action.payload;
      return { ...nextState };
    }
    case "SET_COMPUTED_ATTRIBUTE": {
      let { attributes } = action.payload;

      let fields = Object.keys(attributes);
      const len = fields.length;

      for (let i = 0; i < len; i++) {
        let field = fields[i];
        state[field].local = {
          ...state[field].local,
          ...attributes[field],
        };
      }

      return state;
    }
    default:
      return state;
  }
};

export default styleStore;
