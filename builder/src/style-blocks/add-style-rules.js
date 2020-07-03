import { isArray } from "lodash";

/**
 *
 * @param {Array} styleBlockIds Array of style block ids
 */
export const enqueueStyle = (styleBlock, viewportName) => {
  let { variant } = styleBlock;

  let selector = getSelector(styleBlock);

  if (variant[viewportName]) {
    addCSSRule(selector, variant[viewportName]);
  }

  let hover = `${viewportName}_hover`;
  let focus = `${viewportName}_focus`;

  if (variant[hover]) {
    addCSSRule(`${selector}:hover`, variant[hover]);
  }

  if (variant[focus]) {
    addCSSRule(`${selector}:focus`, variant[focus]);
  }
};

export const collectAndEnqueueStyle = (styleBlocks, viewportName) => {
  for (let i = 0; i < styleBlocks.length; i++) {
    enqueueStyle(styleBlocks[i], viewportName);
  }
};

const addCSSRule = (selector, rules, index) => {
  let { sheet } = editorX;
  if (typeof index === "undefined") {
    index = sheet.cssRules.length;
  }

  for (let i = 0; i < index; i++) {
    let rule = sheet.cssRules[i];
    if (rule.selectorText === selector) {
      sheet.deleteRule(i);
      index = i;
      break;
    }
  }

  if (sheet.insertRule) {
    sheet.insertRule(selector + "{" + rules + "}", index);
  } else {
    sheet.addRule(selector, rules, index);
  }
};

const getSelector = (block) => {
  if (block.type === "class") {
    return `.` + block.className.replace(/\s/g, "-").toLowerCase();
  } else if (block.type === "tag") {
    return block.tag;
  }
  return null;
};

/**
 * https://fonts.googleapis.com/css?family=Bitter:400,700,400italic
 * @param {Array} fonts List of fonts
 */

export const generatFontLink = (fonts) => {
  let baseLink = "https://fonts.googleapis.com/css?family=";
  let fontFamilies = "";
  fonts.map((font) => {
    if (font.source === "Google") {
      let fontFamily = font.family;
      if (font.weights && font.weights.length) {
        fontFamily = fontFamily + ":" + font.weights.join(",");
      }
      if (font.italic) {
        if (font.italic === "same") {
          fontFamily = fontFamily + "," + font.weights.join("italic,");
        } else {
          fontFamily = fontFamily + "," + font.italic.join(",");
        }
      }
      fontFamilies = fontFamilies + "|" + fontFamily;
    }
  });
  baseLink = baseLink + fontFamilies;
  createFontUrlLink(baseLink);
};

const createFontUrlLink = (fontLink) => {
  const _doc = window.frames["sppb-editor-view"].document;
  let style = _doc.createElement("link");
  style.type = "text/html";
  style.href = fontLink;
  style.rel = "stylesheet";
  _doc.head.appendChild(style);

  return style.sheet;
};
