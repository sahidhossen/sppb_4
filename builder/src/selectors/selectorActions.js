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
 * ============
 * STYLE BLOCK AND MAP
 * ============
 */
export const getAddonStyleBlockIds = (store, addonId) => {
  if (addonId === null) return [];
  let addon = getAddon(store, addonId);
  return addon.styleBlockIds || [];
};

export const getStyleBlockIds = (store, parentId) => {
  let { blockStore } = store.styleBlockStore;
  let childIds = blockStore[parentId].children || [];
  return [parentId, ...childIds];
};

export const getStyleBlock = (store, blockId) => {
  return store.styleBlockStore.blockStore[blockId];
};

export const getStyleBlocks = (store, styleBlockIds) => {
  return styleBlockIds.map((styleBlockId) => getStyleBlock(store, styleBlockId));
};

export const getCssMap = (store, blockId) => {
  return store.styleBlockStore.mapStore[blockId];
};

export const getStyleMap = (addonId) => {
  let addon = getAddon(addonId);
  if (addon) {
    // let styleBlockIds
  }
};

/**
 *
 * Pick css properties that used for this block Ids
 *
 * @param {Object} PropertyStore CSS PropertyMapStore
 * @param {Array} blockIds Array of css block Ids
 * @param {String} viewport Viewport name
 */
const getProperties = (PropertyStore, blockIds, viewport) => {
  let properties = {};

  blockIds.map((blockId) => {
    let blockState = PropertyStore[blockId]; // Pick object with viewport
    if (blockState[viewport]) {
      properties = { ...properties, ...blockState[viewport] };
    }
  });
  return properties;
};

/**
 * Get CSS property that used for current addons
 * @param {Object} store Redux Store
 * @param {Object} cssBlockIds CSSPropertyStore BlockIds
 */
export const getCSSProperties = (store, cssBlockIds) => {
  if (cssBlockIds.length === 0) return {};

  let { mapStore } = store.styleBlockStore;

  let { mediaQuery } = store.control;

  let CSSProperties = {};

  if (cssBlockIds.length) {
    CSSProperties = getProperties(mapStore, cssBlockIds, mediaQuery.active);
  }

  return CSSProperties;
};

export const getStyleStore = (store) => {
  return store.styleStore;
};

export const getStyleBlockClasse = (store, styleBlockIds) => {
  return styleBlockIds.map((styleBlockId) => {
    let block = store.styleBlockStore.blockStore[styleBlockId];
    if (block.type === "class") {
      return block.className.replace(/\s/g, "-").toLowerCase();
    }
  });
};

export const getAddonStyleClassName = (store, addonId) => {
  let addon = getAddon(store, addonId);
  let { styleBlockIds } = addon;
  if (styleBlockIds.length > 0) {
    return getStyleBlockClasse(store, styleBlockIds);
  }
  return "";
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
  let { active } = mediaQuery;
  return { ...mediaQuery.list[active], name: active };
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

export const getFonts = (store) => {
  return store.assetsStore.fonts;
};
