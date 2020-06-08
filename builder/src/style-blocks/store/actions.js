export const updateStyleAttributes = (attribues) => {
    return {
      type: "CHANGE_STYLE_ATTRIBUTES",
      payload: attribues,
    };
  };

  export const initiateStyleState = (styleState) => {
    return {
      type: "INITIATE_STYLE_STATE",
      payload: styleState,
    };
  };