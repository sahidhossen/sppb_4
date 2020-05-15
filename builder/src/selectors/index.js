/**
 *
 */
let EMPTY_ARRAY = [];

/**
 * Return all addon from redux store
 * @param {Object} store Page State
 * @param {String} addonId Addon Id
 */
export const getAddons = (store) => {
  return store.builder.present;
};

/**
 * Return addon by addonId from redux store
 * @param {Object} store Page State
 * @param {String} addonId Addon Id
 */
export const getAddon = (store, addonId) => {
  return store.builder.present[addonId];
};

/**
 * Return an array containing all block ID's from parent addon
 * @param {Object} store    Page State
 * @param {String} parentId Optional root addon ID
 */

export const getChildrenIds = (store, parentId) => {
  return store.builder.present[parentId || "root"].childrens || EMPTY_ARRAY;
};

export const getValue = (store, addonId, key) => {
  let addon = store.builder.present[addonId];
  if (!addon.attributes[key]) {
    return null;
  }
  return addon.attributes[key];
};

export const getAddonAttributes = (store, addonId) => {
  if (store.builder.present[addonId]) {
    return store.builder.present[addonId].attributes;
  }
  return {};
};

/**
 *
 * =================
 * FOR DEFAULT ADDON
 * =================
 *
 */

/**
 * Return all default block list
 *
 * @param {Object} store Page State
 */
export const getDefaultAddonList = (store) => {
  return store.addonList;
};

/**
 * Return selected addon from registered addon
 *
 * @param {Object} store Page State
 * @param {String} addonName Registered addon Name
 */
export const getDefaultAddon = (store, addonName) => {
  return store.addonList[`sppb_${addonName.toLowerCase()}`];
};

/**
 * ==============
 * FOR CONTROLLER
 * ==============
 */

export const selectedAddonId = (store) => {
  let { addonId } = store.control.selector;
  return addonId;
};
export const getSelectedAddon = (store) => {
  let { addonId } = store.control.selector;
  if (addonId === null) return null;
  return store.builder.present[addonId];
};

export const getActiveDockerName = (store, dockerName) => {
  let { dockerPalet } = store.control;
  if (!dockerPalet[dockerName]) {
    return null;
  }
  return dockerPalet[dockerName];
};

export const getActiveMediaQuery = (store) => {
  let { mediaQuery } = store.control;
  const viewport =  {...mediaQuery.list[mediaQuery.active], name: mediaQuery.active};
  return viewport;
};

export const getMediaQuery = (store, name) => {
  let {
    mediaQuery: { list },
  } = store.control;
  return list[name];
};

export const getMediaQueries = (store) => {
  let {
    mediaQuery: { list },
  } = store.control;
  return list;
};

export const getPickedAddon = (store) => {
  const pickedAddonName = store.control.pickedAddon;
  if (pickedAddonName === null) {
    return;
  }
  return store.addonList[`sppb_${pickedAddonName.toLowerCase()}`];
};

export const isAddonPicked = (store) => {
  return store.control.pickedAddon !== null;
};

export const getViewContextList = (store) => {
  return store.viewContextList;
};

export const popoverSettingPanel = (store) => {
  return store.popoverSettingPanel;
};
