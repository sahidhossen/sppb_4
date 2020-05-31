import { generateBlock } from "../lib/addonHelper";

/**
 * Register addon on initialize
 * @param {Object} payload Addon Settings
 */
export const registerAddon = (payload) => (dispatch) => {
  dispatch({ type: "REGISTER_ADDON_TYPES", settings: { ...payload } });
};
/**
 * Add addon on page for render
 * @param {Object} payload
 */
export const insertAddon = (payload) => {
  const defaultAddon = generateBlock(payload.defaultAddon);
  return { type: "ADD_ADDON", payload, defaultAddon };
};

/**
 * Transfer addons from on container to another container
 * @param {Object} payload Settings
 */
export const moveAddon = (payload) => {
  return { type: "TRANSFER_ADDON", payload };
};

export const setAttribute = (payload) => {
  return { type: "SET_ATTRIBUTE", payload };
};

export const updateAddonAttributes = (addonId, attributes) => {
  return { type: "SET_ATTRIBUTE", addonId, attributes };
};

export const pickAddon = (addonName) => {
  return { type: "PICK_ADDON", addonName };
};

/**
 * ===========
 * CONTROL ACTIONS
 * ===========
 */

export const selectAddon = (addonId) => {
  let type = "SELECT_ADDON";

  if (addonId.split(",").length > 1) {
    type = "SELECT_MULTIPLE_ADDON";
  }

  return { type: type, payload: { addonId } };
};
export const deselectAddon = () => {
  return { type: "DESELECT_ADDON" };
};
/**
 *
 * @param {*} payload
 */
export const updateSidebarSettings = (sidebarName, settings) => {
  return { type: "SET_SIDEBAR", payload: { sidebarName, settings } };
};

export const updateDocker = (dockerName, tabName) => {
  return { type: "SET_DOCKER", payload: { dockerName, tabName } };
};

export const updateViewport = (viewportName) => {
  return { type: "UPDATE_ACTIVE_MEDIA_QUERY", name: viewportName };
};

export const togglePopoverSettingPanel = (payload) => {
  return { type: "TOGGLE_POPOVER_SETTING_PANEL", payload };
};


/**
 * ==========
 * STYLE ACTIONS
 * ==========
 */
export * from './cssBlockActions';
