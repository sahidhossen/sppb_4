import { getDefaultAddon } from "../lib/addonHelper";

/**
 * Register addon on initialize
 * @param {Object} payload Addon Settings
 */
export const registerAddon = payload => dispatch => {
  dispatch({ type: 'REGISTER_ADDON_TYPES', settings: {...payload} })
}
/**
 * Add addon on page for render
 * @param {Object} payload 
 */
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
