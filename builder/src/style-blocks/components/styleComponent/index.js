import React from "react";
import {
  RangeControl,
  InputControl,
  Divider,
  SelectCustom,
} from "../../../elements";

export default class StyleComponent extends React.Component {
  handleChange(value, name) {
    let { setAttributes } = this.props;
    setAttributes({ [name]: value });
  }
  // handleColorChange(color, name) {
  //   let { setAttributes } = this.props;
  //   let value = color.hex;
  //   // if alpha is selected then set color value to rgba
  //   color.rgb.a < 1 && (value = color.rgb);
  //   setAttributes({ [name]: value });
  // }
  render() {
    console.log("style_3", this.props);
    return (
      <div className="editor-x-style-component">
        <RangeControl
          label="Opacity"
          value="92"
          onChange={(value) => this.handleChange(value, "border_radius")}
          min={0}
          max={10}
        />
        <Divider margin="10px -10px 10px 0px"/>
        <label>Borders</label>
        <div className="editor-x-border-main">
          <div className="editor-x-border-wrapper">
            <div className="editor-x-border-left"></div>
            <div className="editor-x-border-top editor-x-border-active"></div>
            <div className="editor-x-border-center"></div>
            <div className="editor-x-border-bottom"></div>
            <div className="editor-x-border-right"></div>
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
            <span className="editor-x-border-color-property">
              rgba(255, 255, 255, 1)
            </span>
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
        <div className="editor-x-border-radius"></div>
      </div>
    );
  }
}
