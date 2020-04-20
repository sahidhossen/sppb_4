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

export const getValue = (store, addonId, key) => {
  let addon = store.builder.present[addonId]; 
  if (!addon.attributes[key]) {
    return null;
  }
  return addon.attributes[key];
}

export const getAddonAttributes = (store, addonId) => {
  if(store.builder.present[addonId]){ 
    return store.builder.present[addonId].attributes
  }
  return {} ;
}

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
}

/**
 * Return selected addon from registered addon
 * 
 * @param {Object} store Page State
 * @param {String} addonName Registered addon Name
 */
export const getDefaultAddon = (store, addonName) => {
    return store.addonList[addonName];
}



/**
 * ==============
 * FOR CONTROLLER 
 * ==============
 */

export const selectedAddonId = store => {
    let {addonId} = store.control.selector;
    return addonId;
  }
  export const getSelectedAddon = store => {
    let {addonId} = store.control.selector;
    if (addonId === null) 
      return null;
    return store.builder.present[addonId];
  }
  
  export const getActiveDockerName = (store, dockerName) => {
    let {dockerPalet} = store.control
    if (!dockerPalet[dockerName]) {
      return null;
    }
    return dockerPalet[dockerName];
  }