import React, { Component } from "react";
import { SketchPicker } from "react-color";

export class ColorPicker extends Component {
  handleChange(color) {
    this.props.onChange(color);
  }
  render() {
    const { color, disableAlpha } = this.props;

    return (
      <React.Fragment>
        <SketchPicker
          color={color}
          onChange={this.handleChange.bind(this)}
          disableAlpha={disableAlpha ? true : false}
        />
      </React.Fragment>
    );
  }
}

ColorPicker.defaultProps = {
  color: "#ffffff"
};

export default ColorPicker;
