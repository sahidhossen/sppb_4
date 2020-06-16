import React from "react";
import { RangeControl, InputControl, Divider } from "../../../elements";

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
        <Divider/>
        <p className="editor-x-panel-title">Borders</p>
        <div className="editor-x-border-main">
          <div className="editor-x-border-wrapper">
            <div className="editor-x-border-left"></div>
            <div className="editor-x-border-top"></div>
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
        <Divider/>
      </div>
    );
  }
}
