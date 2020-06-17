import { isArray, isString } from "lodash";

export const generateStyleState = (styleStore) => {
  let componentContextValue = {};

  const storeKeys = Object.keys(styleStore);
  const keyLen = storeKeys.length;

  for (let i = 0; i < keyLen; i++) {
    const cssKey = storeKeys[i];
    const Property = { ...styleStore[cssKey] };
    if (!Property.styleState) continue;

    const { type, name, get, set, origin } = Property.styleState;

    let nextValue = Property.local;

    const defaultOrBroswer = origin && origin === "default" ? Property.default : Property.browser;

    if (nextValue.value === null) nextValue.value = defaultOrBroswer.value;
    if (nextValue.unit === null) nextValue.unit = defaultOrBroswer.unit;

    if (isNaN(nextValue.value)) nextValue.unit = "";

    if (isArray(type) || isString(type)) {
      nextValue = nextValue.value;
    }

    if (!componentContextValue[name]) componentContextValue[name] = {};

    if (get) {
      if (!componentContextValue[name][get]) componentContextValue[name][get] = {};
      componentContextValue[name][get][set] = { value: nextValue };
    } else {
      componentContextValue[name][cssKey] = { value: nextValue };
    }
  }

  return componentContextValue;
};
