import deepcopy from "lodash";
import { Fragment } from "react";
import { select } from "store";
import { revisedRandId } from "./utils";
import { SPPBStore } from "../SPPBStore";

/**
 * Prefix {sppb-addonName}
 * @param {String} addonName Only Default name. Prefix will be added by statically
 */
export const getDefaultAddon = addonName => {
  const addonList = select("addonList");
  const _addonName = `sppb_${addonName.toLowerCase()}`;
  const addon = addonList[_addonName] ? addonList[_addonName] : null;
  if (addon) {
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
    "name",
    "attributes",
    "childrens",
    "content",
    "droppable",
    "accept",
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
/**
 * Collect all addon component from children addon ids
 * @param {Array} childrenIds Collection of children addon Ids
 */
export const getChildAddons = childrenIds => {
  const _childrenIds =
    typeof childrenIds === "string" ? [childrenIds] : childrenIds;
  const builder = select("data");
  console.log("builder", builder);
  return _childrenIds.map(Id => builder[Id].Component);
};

// export const renderChildAddons = childrenIds => {
//   const childAddons = getChildAddons(childrenIds);
//   return childAddons.map((ChildAddon, index) => {
//     SPPBStore(<ChildAddon key={index} />);
//   });
// };
