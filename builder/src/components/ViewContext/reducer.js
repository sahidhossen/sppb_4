export const viewContextReducer = (state, { type, payload }) => {
  switch (type) {
    case "CHANGE_VIEW_NAME":
      return {
        ...state,
        name: payload,
      };
    case "CHANGE_VIEW_VALUE":
      return {
        ...state,
        value: payload,
      };
    default:
      return state;
  }
};
