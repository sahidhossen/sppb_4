import hyphenate from "hyphenate-style-name";
import { isObject } from "lodash";
import { getBackgroundString } from "../lib/utils";
/**
 * Convert computed property object to css object and string
 * @param {Object} attributes List of css computed property
 * backgrounds:[]
 */
export const createMarkup = (attributes) => {
  const keys = Object.keys(attributes);

  if (!keys.length) return "";
  let i,
    len = keys.length;
  let cssString = "";
  let cssObject = {};

  for (i = 0; i < len; i++) {
    const key = keys[i];
    let preValue = attributes[key];
    let value = "";

    if (key === "backgroundImages") {
      preValue.forEach(({ type, ...restProps }) => {
        value += `${getBackgroundString(type, restProps)}, `;
      });
      value = value.trim().slice(0, -1);
    } else {
      if (isObject(preValue)) {
        value = addUnit(preValue);
      } else {
        value = preValue;
      }
    }

    cssString += hyphenate(key) + ":" + value + ";";

    cssObject = { ...cssObject, [key]: value };
  }

  return { cssString, cssObject };
};

const addUnit = (valueObj) => {
  let unit = valueObj.unit === null ? "" : valueObj.unit;
  return valueObj.value + unit;
};

/**
 * Convert css object to css style string
 * @param {Object} cssObject Style object related to css property
 */
export const objectToCss = (cssObject) => {
  const cssKeys = Object.keys(cssObject);
  if (!cssKeys.length) return "";

  let i,
    len = cssKeys.length;
  let cssString = "";

  for (i = 0; i < len; i++) {
    const key = cssKeys[i];
    const val = cssObject[key];
    cssString += hyphenate(key) + ":" + val + ";";
  }
  return cssString;
};

/**
 * Convert inline css string to css object
 * @param {String} cssString inline css string
 */
export const cssToObject = (cssString) => {
  let cssStringArr = cssString.split(";");
  let len = cssStringArr.length;
  let cssObj = {};

  for (let i = 0; i < len; i++) {
    let property = cssStringArr[i].split(":");
    let key = property[0];
    let value = property[1];
    if (key) {
      cssObj = { ...cssObj, [key]: value };
    }
  }
  return cssObj;
};
