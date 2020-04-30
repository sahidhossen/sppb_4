export const changeViewValue = (value) => {
  return {
    type: "CHANGE_VIEW_VALUE",
    payload: value,
  };
};
export const changeViewName = (value) => {
  return {
    type: "CHANGE_VIEW_NAME",
    payload: value,
  };
};

export const viewContextAction = {
  changeViewName,
  changeViewValue,
};
