const has_units = {
  height: true,
  maxHeight: true,
  minHeight: true,
  width: true,
  maxWidth: true,
  minWidth: true,
  paddingLeft: true,
  paddingRight: true,
  paddingBottom: true,
  paddingTop: true,
  marginLeft: true,
  marginRight: true,
  marginBottom: true,
  marginTop: true,
  fontSize: true,
  top: true,
  left: true,
  right: true,
  bottom: true,
  columnGap: true,
  columnRuleWidth: true,
  borderRadius: true,
  borderBottomLeftRadius: true,
  borderBottomRightRadius: true,
  borderTopLeftRadius: true,
  borderTopRightRadius: true,
  borderWidth: true,
  borderBottomWidth: true,
  borderLeftWidth: true,
  borderRightWidth: true,
  borderTopWidth: true,
  fontSize: true,
  lineHeight: true,
};

export const hasUnit = (key) => has_units[key] || false;

const arrayFilter = (arr) => {
  let temp = [];
  for (let i of arr) i && temp.push(i);
  return temp;
};

let validUnits = ["px", "em", "%", "vh", "vw", "auto"];

let isValidUnit = (unit) => validUnits.includes(unit);

export const extractUnit = (key, value) => {
  let property = { value: null, unit: null };
  if (!value) {
    return property;
  }

  let extractor = arrayFilter(value.split(/(\d+)/));

  property.value = extractor[0] || null;
  property.unit = isValidUnit(extractor[1] || null) ? extractor[1] : null;

  return property;
};
