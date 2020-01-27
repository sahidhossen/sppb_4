import { generateBlock } from "../lib/addonHelper";

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
export const insertAddon = payload => {
  const defaultAddon = generateBlock(payload.defaultAddon);
  return { type: "ADD_BLOCK", payload, defaultAddon };
};

/**
 * Transfer addons from on container to another container
 * @param {Object} payload Settings
 */
export const moveAddon = payload => {
  return { type: 'TRANSFER_BLOCK', payload };
}

export const setAttribute = payload => {
  return { type: "SET_ATTRIBUTE", payload };
};

export const updateAddonAttributes = (addonId, attributes) => {
  return { type: "SET_ATTRIBUTE", addonId, attributes };
};
