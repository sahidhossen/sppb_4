export const defaultComponentValues = {
  spacing: {
    paddingLeft: { value: { value: null, unit: null } },
    paddingRight: { value: { value: null, unit: null } },
    paddingTop: { value: { value: null, unit: null } },
    paddingBottom: { value: { value: null, unit: null } },
    marginLeft: { value: { value: null, unit: null } },
    marginRight: { value: { value: null, unit: null } },
    marginTop: { value: { value: null, unit: null } },
    marginBottom: { value: { value: null, unit: null } },
  },
  size: {
    height: { value: { value: null, unit: null }, origin: "default" },
    maxHeight: { value: { value: null, unit: null }, origin: "default" },
    minHeight: { value: { value: null, unit: null }, origin: "default" },
    width: { value: { value: null, unit: null }, origin: "default" },
    maxWidth: { value: { value: null, unit: null }, origin: "default" },
    minWidth: { value: { value: null, unit: null }, origin: "default" },
    overflow: { value: null },
  },
  backgrounds: {
    backgroundColor: { value: "" },
    backgroundImages: { value: null },
  },
  style: {
    opacity: { value: null },
    borderWidth: { value: { value: null, unit: null } },
    borderStyle: { value: null },
    borderColor: { value: "" },
  },
};

export const stateProperties = {
  spacing: {
    paddingLeft: { value: {} },
    paddingRight: { value: {} },
    paddingTop: { value: {} },
    paddingBottom: { value: {} },
    marginLeft: { value: {} },
    marginRight: { value: {} },
    marginTop: { value: {} },
    marginBottom: { value: {} },
  },
  size: {
    height: { value: {}, origin: "default" },
    maxHeight: { value: {}, origin: "default" },
    minHeight: { value: {}, origin: "default" },
    width: { value: {}, origin: "default" },
    maxWidth: { value: {}, origin: "default" },
    minWidth: { value: {}, origin: "default" },
    overflow: { value: {} },
  },
  backgrounds: {
    backgroundColor: { value: "" },
    backgroundImages: { value: [] },
  },
  style: {
    opacity: { value: null },
    border: { value: {}, maping: ["borderWidth", "borderStyle", "borderColor"] },
  },
};
