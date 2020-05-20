import { revisedRandId } from "./utils";
import { createMarkup, objectToCss } from "style-blocks";

/**
 *
 * @param {Object} attributes List of attribute and their units
 * @param {Object} options css depedency options {Exmp: viewport, className...}
 */
export const createStyleBlock = (options) => {
  const { className, viewport, styles } = options;
  const cssStyle = objectToCss(styles);
  return {
    id: revisedRandId(),
    type: "class",
    className,
    styless: cssStyle,
    variant: { [viewport]: cssStyle },
  };
};

/**
 * Create style map object
 * @param {Object} attributes List of css Attributes
 * @param {Object} options css depedency options {Exmp: viewport, className...}
 * @param {String} styleBlockId Style Block ID
 */
export const getStyleMap = (attributes, options) => {
  return {
    [options.viewport]: { ...getStyleMapProperty(attributes) },
  };
};

export const getStyleMapProperty = (attributes) => {
  let properties = {};
  Object.keys(attributes).map((key) => {
    properties[key] = true;
  });
  return properties;
};

/**
 *
 * @param {Object} attributes {paddingLeft:, paddingRight} -> padding-left:, padding-right
 * @param {*} cssString "padding-left:10px, margin-left:10px;"
 */
export const createCssMarkup = (cssStyles) => {
  return objectToCss(cssStyles);
};
