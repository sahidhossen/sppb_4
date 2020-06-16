import { isObject, isArray } from "lodash";
import { defaultComponentValues } from "./default-components-value";

export const generateStyleState = (styleStore) => {
  let componentContextValue = { ...defaultComponentValues };
  Object.keys(defaultComponentValues).map((componentKey) => {
    let currentContextValue = componentContextValue[componentKey];
    componentContextValue[componentKey] = {
      ...currentContextValue,
      ...updateFieldValue(styleStore, currentContextValue),
    };
  });
  return componentContextValue;
};

const updateFieldValue = (styleStore, fields) => {
  const contextFields = {};
  Object.keys(fields).map((fieldName) => {
    let fieldValue = styleStore[fieldName];
    contextFields[fieldName] = getValueAndUnit(fieldValue, fields[fieldName]);
  });
  return contextFields;
};

const getValueAndUnit = (fieldOpts, initValue) => {
  let { local, browser, placeholder } = fieldOpts;
  let propertyValue = initValue.value;

  let isDefault =
    typeof initValue.origin !== "undefined" && initValue.origin === "default";

  if (local.value && local.value !== null) {
    propertyValue = mergeValue(propertyValue, local.value);
  } else if (browser.value && browser.value !== null && !isDefault) {
    propertyValue = mergeValue(propertyValue, browser.value);
  } else {
    propertyValue = mergeValue(propertyValue, fieldOpts.default.value);
  }

  if (typeof propertyValue.unit !== "undefined") {
    if (local.unit && local.unit !== null) {
      propertyValue = {
        ...propertyValue,
        unit: isNaN(local.value) ? "" : local.unit,
      };
    } else if (browser.unit && browser.unit !== null && !isDefault) {
      propertyValue = {
        ...propertyValue,
        unit: isNaN(browser.value) ? "" : browser.unit,
      };
    } else {
      propertyValue = {
        ...propertyValue,
        unit: isNaN(fieldOpts.default.value) ? "" : fieldOpts.default.unit,
      };
    }
  }

  initValue = { ...initValue, value: propertyValue, placeholder };
  return initValue;
};

const mergeValue = (oldValue, value) => {
  let nextValue = oldValue;
  if (isObject(oldValue)) {
    nextValue = { ...oldValue, value };
  } else {
    // Array or string
    nextValue = value;
  }
  return nextValue;
};

const mergeUnit = (value, oldUnit, newUnit) => {};
