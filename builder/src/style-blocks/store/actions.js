export const updateStyleAttributes = (attributes, options) => {
    return {
      type: "CHANGE_STYLE_ATTRIBUTES",
      payload: {attributes, options},
    };
  };

  export const initiateStyleState = (data) => {
    return {
      type: "INITIATE_STYLE_STATE",
      payload: {...data},
    };
  };