import deepcopy from "lodash";
import { select } from "store";
import { revisedRandId } from "./utils";

/**
 * Prefix {sppb-addonName}
 * @param {String} addonName Only Default name. Prefix will be added by statically
 */
export const getDefaultAddon = addonName => {
  const addonList = select("addonList");
  const _addonName = `sppb_${addonName.toLowerCase()}`;
  const addon = addonList[_addonName] ? addonList[_addonName] : null;
  if (addon) {
    console.log("from helper generated", generateBlock(addon));
    return generateBlock(addon);
  }
  return false;
};

/**
 * Generate New block by requested block name from stored blocklist with new Revised Id
 * @param {Object} state Current state
 * @param {string} blockName
 * @param {Object} properties // Block properties
 * @param {object} attributes // Block attributes
 */
export const generateBlock = (
  defaultAddon,
  properties = {},
  attributes = {}
) => {
  const acceptedFields = [
    "Component",
    "attributes",
    "childrens",
    "content",
    "id"
  ];
  const block = Object.keys(defaultAddon).reduce((editedAddon, key) => {
    if (acceptedFields.includes(key)) editedAddon[key] = defaultAddon[key];
    return editedAddon;
  }, {});
  return {
    ...block,
    id: revisedRandId(),
    ...properties,
    attributes: { ...block.attributes, ...attributes }
  };
};
