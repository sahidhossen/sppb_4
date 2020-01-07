import { getDefaultAddon } from "../lib/addonHelper";
/**
 * Add Section
 */
export const addSection = sectionData => {
  return {
    type: "ADD_SECTION",
    payload: sectionData
  };
};

export const addAddon = payload => dispatch => {
  const defaultAddon = getDefaultAddon(payload.blockName);
  dispatch({ type: "ADD_BLOCK", payload, defaultAddon });
};

export const setAttribute = payload => {
  return {
    type: "SET_ATTRIBUTE",
    payload
  };
};
