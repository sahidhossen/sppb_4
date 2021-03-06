import { select } from "store";

export const setComputeStyle = (data) => {
  return { type: "SET_COMPUTED_STYLE", payload: data };
};

const getCssBlockDepedencies = (options) => {
  let { getAddon, getActiveMediaQuery } = select();
  if (!options.className) {
    const { addonId } = options;
    let { name } = getAddon(addonId);
    options["className"] = `${name}-` + addonId;
  }
  if (!options.viewport) {
    let { name } = getActiveMediaQuery();
    options["viewport"] = name;
  }
  return options;
};

export const updateComputedStyle = (attributes, options = {}, isBatch = false) => {
  // let getComputeStyle = {backgroundColor: {local:{value: 'rgba(0,0,0,1)'}}}

  // set local keywork between name and value;
  let nextOptions = { ...options, ...getCssBlockDepedencies(options) };
  return {
    type: "SET_COMPUTED_ATTRIBUTE",
    payload: { attributes, options: nextOptions },
    meta: { batch: isBatch },
  };
};
