import React from "react";
import { select } from "store";
import { revisedRandId } from "./utils";
import { clone } from "lodash";

/**
 * Prefix {sppb-addonName}
 * @param {String} addonName Only Default name. Prefix will be added by statically
 */
export const getDefaultAddon = (addonList, addonName) => {
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
    "name",
    "attributes",
    "childrens",
    "content",
    "droppable",
    "accept",
    "id"
  ];
  const block = Object.keys(defaultAddon).reduce((editedAddon, key) => {
    if (acceptedFields.includes(key))
      editedAddon[key] = clone(defaultAddon[key], true);
    return editedAddon;
  }, {});

  if (!block["attributes"]) {
    block["attributes"] = {};
  }
  if (!block["childrens"]) {
    block["childrens"] = [];
  }
  
  // Check if Components has templateSet static functions

  const {Component} = defaultAddon; 
  console.log("component: ", defaultAddon)
  if (Component.templateSet) {
    let templateSet = Component.templateSet()
    console.log(" has template sets", templateSet)
  }

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
export const getChildAddons = addonId => {
  const builder = select("data");
  const addon = builder[addonId];
  // const _childrenIds =
  //   typeof childrenIds === "string" ? [childrenIds] : childrenIds;
  return addon.childrens.map(Id => builder[Id]);
};

export const renderChildAddons = props => {
  const childAddons = getChildAddons(props.addonId);
  // if (props.block.name === 'column') {
  // console.log("=======COLUMN=======:",props.block.name, childAddons)
  // }
  return childAddons.map((addon, index) => {
    let { Component, id } = addon;
    return <Component key={index} {...props} block={addon} addonId={id} />;
  });
};

export const createIndicator = (hoverItem, mousePositions) => {
  const { width, height, left, top } = hoverItem;
  const {
    top: mouseTop,
    bottom: mouseBottom,
    inside: mouseInside
  } = mousePositions;
  const { width: sidebarWidth } = document
    .querySelector("#sppb_sidebar")
    .getBoundingClientRect();
  let indicator = document.querySelector(".sppb-indicator");
  const body = document.querySelector("body");
  if (!indicator) {
    indicator = document.createElement("div");
    indicator.classList.add("sppb-indicator");
    body.appendChild(indicator);
  }
  indicator.style.width = `${width}px`;
  indicator.style.left = `${left + sidebarWidth}px`;
  indicator.style.top = `${top}px`;
  indicator.style.height = `${height}px`;

  indicator.style.border = "none";
  mouseTop && (indicator.style.borderTop = "1px solid blue");
  mouseBottom && (indicator.style.borderBottom = "1px solid blue");
  mouseInside && (indicator.style.border = `1px solid blue`);
};

export const removeIndicator = () => {
  const indicator = document.querySelector(".sppb-indicator");
  if (indicator) {
    document.querySelector("body").removeChild(indicator);
  }
};
