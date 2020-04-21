import React, { Component } from "react";

export class ColorPalette extends Component {
  handleChange(color) {
    this.props.onChange(color);
    console.log("yo", color);
  }

  render() {
    const { colors, value, className } = this.props;
    const defaultClass = [
      "sppb-color-palette",
      ...(className ? [className] : [])
    ].join(" ");

    return (
      <div className={defaultClass}>
        {colors &&
          colors.map(({ color, name }) => (
            <button
              className={`sppb-color-palette-item ${
                color === value ? `active` : ``
              }`}
              style={{
                backgroundColor: color,
                height: "28px",
                width: "28px",
                borderRadius: "100%",
                outline: "none"
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