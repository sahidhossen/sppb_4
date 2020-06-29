import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { RangeControl, InputControl, Divider, SelectCustom } from "../../../elements";

const _borderWidth = ["borderBottomWidth", "borderLeftWidth", "borderRightWidth", "borderTopWidth"];
const _borderColor = ["borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor"];
const _borderStyle = ["borderBottomStyle", "borderLeftStyle", "borderRightStyle", "borderTopStyle"];

const StyleComponent = (props) => {
  const { style: styleProps, setCssAttributes, addonId } = props;

  const {
    opacity,
    borderBottomColor,
    borderLeftColor,
    borderRightColor,
    borderTopColor,
    borderBottomStyle,
    borderRightStyle,
    borderTopStyle,
    borderLeftStyle,
    borderBottomWidth,
    borderLeftWidth,
    borderRightWidth,
    borderTopWidth,
    borderColor,
    borderStyle,
    borderWidth,
  } = styleProps;

  const [borderStatus, setBorderStatus] = useState("center");
  const [borderState, setBorderState] = useState({ width: { unit: null, value: null }, style: "none", color: "" });

  const isEqualWidth = () => {
    let equal = false;
    const value = borderBottomWidth.value.value;
    if (
      borderLeftWidth.value.value === value &&
      borderRightWidth.value.value === value &&
      borderTopWidth.value.value === value
    )
      equal = true;
    return equal;
  };

  const isEqualStyle = () => {
    let equal = false;
    const value = borderBottomStyle.value;
    if (borderLeftStyle.value === value && borderRightStyle.value === value && borderTopStyle.value === value)
      equal = true;
    return equal;
  };

  const isEqualColor = () => {
    let equal = false;
    const value = borderBottomColor.value;
    if (borderLeftColor.value === value && borderRightColor.value === value && borderTopColor.value === value)
      equal = true;
    return equal;
  };

  const updateFieldValue = (position) => {
    let color = borderColor.value,
      width = borderWidth.value,
      style = borderStyle.value;

    if (position === "center") {
      if (isEqualWidth()) {
        width = borderTopWidth.value;
      }
      if (isEqualColor()) {
        color = borderTopColor.value;
      }
      if (isEqualStyle()) {
        style = borderTopStyle.value;
      }
      setBorderState({ width, color, style });
    } else if (position === "left") {
      setBorderState({
        width: borderLeftWidth.value,
        color: borderLeftColor.value,
        style: borderLeftStyle.value,
      });
    } else if (position === "right") {
      setBorderState({
        width: borderRightWidth.value,
        color: borderRightColor.value,
        style: borderRightStyle.value,
      });
    } else if (position === "top") {
      setBorderState({
        width: borderTopWidth.value,
        color: borderTopColor.value,
        style: borderTopStyle.value,
      });
    } else if (position === "bottom") {
      setBorderState({
        width: borderBottomWidth.value,
        color: borderBottomColor.value,
        style: borderBottomStyle.value,
      });
    }
  };

  const setBorderStatusHandler = (status) => (event) => {
    if (borderStatus === status) return;
    setBorderStatus(status);
  };

  useEffect(() => {
    updateFieldValue(borderStatus);
  }, [borderStatus, styleProps, addonId]);

  const onOpacityChangeHandler = (value, name) => {
    setCssAttributes({ [name]: value });
  };

  const updateColorProperty = (value, position) => {
    let updatedProperties = {};
    let { style, width } = borderState;
    if (position === "center") {
      _borderColor.map((field) => {
        const widthField = _borderWidth[index];
        if (styleProps[widthField].value.value === "0") {
          updatedProperties[widthField] = { ...styleProps[widthField].value, vlaue: 1 };
          width = updatedProperties[widthField];
        }

        const styleField = _borderStyle[index];
        if (styleProps[styleField].value === "none") {
          updatedProperties[styleField] = "solid";
          style = "solid";
        }
        updatedProperties[field] = value;
      });
    } else if (position === "left") {
      updatedProperties = { borderLeftColor: value };
    } else if (position === "right") {
      updatedProperties = { borderRightColor: value };
    } else if (position === "top") {
      updatedProperties = { borderTopColor: value };
    } else if (position === "bottom") {
      updatedProperties = { borderBottomColor: value };
    }
    setBorderState({ color: value, width, style });
    return updatedProperties;
  };

  const updateStyleProperty = (value, position) => {
    let updatedProperties = {};
    let width = borderState.width;
    if (position === "center") {
      _borderStyle.map((field, index) => {
        const widthField = _borderWidth[index];
        if (styleProps[widthField].value.value === "0") {
          updatedProperties[widthField] = { ...styleProps[widthField].value, vlaue: 1 };
          width = updatedProperties[widthField];
        }
        updatedProperties[field] = value;
      });
    } else if (position === "left") {
      updatedProperties = { borderLeftStyle: value };
    } else if (position === "right") {
      updatedProperties = { borderRightStyle: value };
    } else if (position === "top") {
      updatedProperties = { borderTopStyle: value };
    } else if (position === "bottom") {
      updatedProperties = { borderBottomStyle: value };
    }
    setBorderState({ ...borderState, width, style: value });
    return updatedProperties;
  };

  const updateHeightProperty = (width, position) => {
    let updatedProperties = {};
    let style = borderState.style;
    if (position === "center") {
      _borderWidth.map((field, index) => {
        const styleField = _borderStyle[index];
        if (styleProps[field].value.value === "0" && styleProps[styleField].value === "none") {
          updatedProperties[styleField] = "solid";
          style = "solid";
        }
        updatedProperties[field] = { ...styleProps[field].value, ...width };
      });
    } else if (position === "left") {
      updatedProperties["borderLeftWidth"] = { ...borderLeftWidth.value, ...width };
    } else if (position === "right") {
      updatedProperties["borderRightWidth"] = { ...borderRightWidth.value, ...width };
    } else if (position === "top") {
      updatedProperties["borderTopWidth"] = { ...borderTopWidth.value, ...width };
    } else if (position === "bottom") {
      updatedProperties["borderBottomWidth"] = { ...borderBottomWidth.value, ...width };
    }
    setBorderState({ ...borderState, width: { ...borderState.width, ...width }, style });
    return updatedProperties;
  };

  const onValueChangeHandler = (type) => (value) => {
    setCssAttributes({ ...updateHeightProperty({ [type]: value }, borderStatus) });
  };

  const onBorderWidthChange = (value) => {
    setCssAttributes({ ...updateHeightProperty(value, borderStatus) });
  };

  const onBorderStyleChange = (value) => {
    setCssAttributes({ ...updateStyleProperty(value, borderStatus) });
  };

  return (
    <div className="editor-x-style-component">
      <RangeControl
        label="Opacity"
        value={(opacity && opacity.value) || 0}
        onChange={(value) => onOpacityChangeHandler(value, "opacity")}
        min={0}
        step={0.1}
        max={1}
      />
      <Divider />
      <p className="editor-x-panel-title">Borders</p>
      <div className="editor-x-border-main">
        <div className={`editor-x-border-wrapper editor-x-border-active-${borderStatus}`}>
          <div className="editor-x-border-left" onClick={setBorderStatusHandler("left")}></div>
          <div className="editor-x-border-top" onClick={setBorderStatusHandler("top")}></div>
          <div className="editor-x-border-center" onClick={setBorderStatusHandler("center")}></div>
          <div className="editor-x-border-bottom" onClick={setBorderStatusHandler("bottom")}></div>
          <div className="editor-x-border-right" onClick={setBorderStatusHandler("right")}></div>
        </div>
        <div className="editor-x-border-controls">
          <RangeControl
            value={borderState.width.value || 0}
            onChange={onValueChangeHandler("value")}
            min={0}
            max={10}
            disableInput={true}
          />
          <InputControl
            // label="H"
            value={{ unit: borderState.width.unit, value: borderState.width.value || 0 }}
            placeholder={{ value: "0", unit: "px" }}
            onChange={(value) => onBorderWidthChange(value)}
            // unit={{ px: "px", em: "em" }} // optiona
          />
        </div>
      </div>
      <div className="editor-x-border-color-wrap">
        <div className="editor-x-color-fields">
          <span className="editor-x-color-value"></span>
          <span className="editor-x-color-property">rgba(255, 255, 255, 1)</span>
        </div>
        <span className="editor-x-border-color-delete">
          <i className="fas fa-trash-alt"></i>
        </span>
      </div>
      <SelectCustom
        value={borderState.style}
        onSelectChange={(value) => onBorderStyleChange(value)}
        options={[
          { value: "none" },
          { value: "solid", selected: true },
          { value: "dashed" },
          { value: "dotted" },
          { value: "double" },
          { value: "groove" },
          { value: "ridge" },
          { value: "inset" },
          { value: "outset" },
        ]}
      />
    </div>
  );
};
StyleComponent.propTypes = {
  addonId: PropTypes.string,
  style: PropTypes.object,
  setCssAttributes: PropTypes.func,
};
export default StyleComponent;
