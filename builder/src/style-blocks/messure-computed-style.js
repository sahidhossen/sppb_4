import { hasUnit, extractUnit } from "./unit-to-style";
import styleStore from "../reducers/defaultStyle";
import { parse } from "gradient-parser";

let differentProperties = {
  backgroundImages: "backgroundImage",
  fontColor: "color",
  filters: "filter",
  textShadows: "textShadow",
  transforms: "transform",
  transitions: "transition",
};

export const getElementComputedStyle = (element, localProperties) => {
  let computedStyle = getComputedStyle(element);

  let defaultProperties = { ...styleStore };

  Object.keys(defaultProperties).map((cssKey) => {
    let extenedKey = cssKey;

    if (differentProperties[extenedKey] && computedStyle[differentProperties[extenedKey]]) {
      extenedKey = differentProperties[extenedKey];
    }

    let hasLocalProperty = localProperties[extenedKey] || null;

    let value = computedStyle[extenedKey];

    /**
     * I have property and propertyKey
     */
    let mountableValue = cssToLocalValue(cssKey, value);

    if (hasLocalProperty) {
      defaultProperties[cssKey] = {
        ...defaultProperties[cssKey],
        local: { ...mountableValue },
        browser: { ...mountableValue },
      };
    } else {
      defaultProperties[cssKey] = {
        ...defaultProperties[cssKey],
        browser: { ...mountableValue },
      };
    }
  });
  return defaultProperties;
};

const cssToLocalValue = (key, value) => {
  let nextProperty = { value: null, unit: null };

  if (hasUnit(key)) {
    nextProperty = { ...extractUnit(key, value) };
  } else {
    nextProperty.value = pickConditionaly(key, value);
  }
  return nextProperty;
};

const pickConditionaly = (key, value) => {
  switch (key) {
    case "backgroundImages": {
      let st =
        "linear-gradient(20deg, rgb(233, 49, 49) 0%, #ccc 100%), radial-gradient(circle farthest-side at 10% 90%, rgb(49, 98, 233) 0%, rgb(255, 255, 255) 100%)";
      let _s = st
        .split(",")
        .filter((s) => !s.includes("url"))
        .join(",");

      const parsedData = parse(_s);

      const newData = modifyData(parsedData);

      return newData;
    }
    default:
      return value;
  }
};

function modifyData(parsedData) {
  return parsedData.map((data) => {
    if (data.type === "linear-gradient") {
      const { type, orientation, colorStops } = data;
      let angle = { unit: "deg", value: 0 };
      const stops = filterColorStops(colorStops);

      if (orientation) {
        angle = { ...angle, value: orientation.value };
      }

      return {
        type,
        angle,
        stops,
      };
    } else if (data.type === "radial-gradient") {
      const { type, orientation, colorStops } = data;
      let extent = orientation[0].style.value;
      const positionValues = orientation[0].at.value;
      const stops = filterColorStops(colorStops);

      let position = {
        x: { unit: positionValues.x.type, value: positionValues.x.value },
        y: { unit: positionValues.y.type, value: positionValues.y.value },
      };

      return {
        type,
        extent,
        position,
        stops,
      };
    }
  });
}

function filterColorStops(colorStops) {
  return colorStops.map((stop) => {
    const { length, type, value } = stop;
    let color = { type: "color", value: null };

    if (type === "hex") {
      color = { ...color, value: `#${value}` };
    } else {
      color = { ...color, value: `${type}(${value.join(",")})` };
    }

    return {
      color,
      position: { unit: length.type, value: length.value },
    };
  });
}
