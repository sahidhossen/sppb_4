import React, { useState } from "react";
import PropTypes from "prop-types";
import { RangeControl, InputControl, Divider, SelectCustom } from "../../../elements";

const StyleComponent = (props) => {
  const { style, setCssAttributes } = props;

  const {
    opacity,
    borderBottomColor,
    borderBottomStyle,
    borderBottomWidth,
    borderColor,
    borderLeftColor,
    borderLeftStyle,
    borderLeftWidth,
    borderRightColor,
    borderRightStyle,
    borderRightWidth,
    borderStyle,
    borderTopColor,
    borderTopStyle,
    borderTopWidth,
    borderWidth,
  } = style;

  const [state, setState] = useState({ borderStatus: "center" });

  const setBorderStatus = (status) => (event) => {
    setState({ ...state, borderStatus: status });
  };

  const onOpacityChangeHandler = (value, name) => {
    setCssAttributes({ [name]: value });
  };

  return (
    <div className="editor-x-style-component">
      <RangeControl
        label="Opacity"
        value={opacity.value || 0}
        onChange={(value) => onOpacityChangeHandler(value, "opacity")}
        min={0}
        max={10}
      />
      <Divider />
      <p className="editor-x-panel-title">Borders</p>
      <div className="editor-x-border-main">
        <div className={`editor-x-border-wrapper editor-x-border-active-${state.borderStatus}`}>
          <div className="editor-x-border-left" onClick={setBorderStatus("left")}></div>
          <div className="editor-x-border-top" onClick={setBorderStatus("top")}></div>
          <div className="editor-x-border-center" onClick={setBorderStatus("center")}></div>
          <div className="editor-x-border-bottom" onClick={setBorderStatus("bottom")}></div>
          <div className="editor-x-border-right" onClick={setBorderStatus("right")}></div>
        </div>
        <div className="editor-x-border-controls">
          <RangeControl
            value="30"
            onChange={(value) => this.handleChange(value, "border_radius")}
            min={0}
            max={10}
            disableInput={true}
          />
          <InputControl
            // label="H"
            value={{ unit: "px", value: "30" }}
            // placeholder={height.placeholder || null}
            // onChange={(value) => this.onChangeSize(value, "height")}
            // unit={{ px: "px", em: "em" }} // optiona
          />
        </div>
      </div>
      <div className="editor-x-border-color-wrap">
        <div className="editor-x-border-color-fields">
          <span className="editor-x-border-color-value"></span>
          <span className="editor-x-border-color-property">rgba(255, 255, 255, 1)</span>
        </div>
        <span className="editor-x-border-color-delete">
          <i className="fas fa-trash-alt"></i>
        </span>
      </div>
      <SelectCustom
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
export default StyleComponent;
