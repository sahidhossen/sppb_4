/**
 * 
 */
let EMPTY_ARRAY = [];

/**
 * Return addon by addonId from redux store
 * @param {Object} store Page State
 * @param {String} addonId Addon Id
 */
export const getAddon = (store, addonId) => {
    return store.builder.present[addonId];
}

/**
 * Return an array containing all block ID's from parent addon
 * @param {Object} store    Page State
 * @param {String} parentId Optional root addon ID
 */

export const getChildrenIds = (store, parentId) => {
    return store.builder.present[parentId || 'root'].childrens || EMPTY_ARRAY;
}

/**
 * Return all default block list
 * 
 * @param {Object} store Page State
 */
export const getDefaultAddonList = (store) => {
    return store.addonList;
}

/**
 * Return selected addon from registered addon
 * 
 * @param {Object} store Page State
 * @param {String} addonName Registered addon Name
 */
export const getDefaultAddon = (store, addonName) => {
    const _addonName = `sppb_${addonName.toLowerCase()}`
    return store.addonList[_addonName];
}

