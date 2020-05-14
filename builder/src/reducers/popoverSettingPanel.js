const initialState = {
  status: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "TOGGLE_POPOVER_SETTING_PANEL":
      return { ...state, ...payload };
    default:
      return state;
  }
};
