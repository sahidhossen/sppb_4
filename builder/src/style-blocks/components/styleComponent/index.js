import React from "react";
import { RangeControl } from "../../../elements";

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
    return (
      <div className="editor-x-style-component">
        <RangeControl
          label="Opacity"
          value="92"
          onChange={value => this.handleChange(value, "border_radius")}
          min={0}
          max={10}
        />
      </div>
    );
  }
}
