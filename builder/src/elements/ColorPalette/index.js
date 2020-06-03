import React, { Component } from "react";
import { ViewContext } from "../../components/ViewContext";

export class ColorPalette extends Component {
  handleChange(color) {
    this.props.onChange(color);
  }

  render() {
    const { colors, value, className } = this.props;
    const defaultClass = "sppb-color-palette editor-x-form-controllers";
    const elementClass = [defaultClass, ...(className ? [className] : [])].join(
      " "
    );

    return (
      <div className={elementClass}>
        {colors &&
          colors.map(({ color, name }) => (
            <button
              className={`sppb-color-palette-item ${
                color === value ? `active` : ``
              }`}
              style={{
                backgroundColor: color,
                // height: "28px",
                // width: "28px",
                // borderRadius: "100%",
                // outline: "none",
              }}
              key={color}
              selected={color === value}
              onClick={() => this.handleChange(color)}
            ></button>
          ))}
      </div>
    );
  }
}

export default ColorPalette;
