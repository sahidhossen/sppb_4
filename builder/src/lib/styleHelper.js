import { revisedRandId } from "./utils";
import { createMarkup } from "style-blocks";

/**
 *
 * @param {Object} attributes List of attribute and their units
 * @param {Object} options css depedency options {Exmp: viewport, className...}
 */
export const createStyleBlock = (attributes, options) => {
  const { className, viewport } = options;
  const cssStyle = createCssMarkup(attributes);
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
  let properties = {};
  Object.keys(attributes).map((key) => {
    properties[key] = true;
  });
  return {
    [options.viewport]: { ...properties },
  };
};

export const createCssMarkup = (attributes, cssString = "") => {
  let cssMarkup = createMarkup(attributes);
  if (cssString === "") {
    return cssMarkup;
  } else {
    const updatedProperties = cssMarkup.match(/([a-z\d_-]+):/gi);
    updatedProperties.forEach((prop) => {
      const regexp = new RegExp(`(?:${prop.slice(0, -1)}:[^;]*)`);
      cssString.replace(regexp, "paddigLeft: 200px");
    });
    ///([a-z\d_-]+):/gi

    // str.replace(/(?:paddingLeft:[^;]*)/, "paddigLeft: 200px")
    console.log("here", attributes, cssMarkup, cssString);
  }
  // replace css rules to existing css string
};
