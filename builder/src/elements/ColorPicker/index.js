import React, { Component, Fragment } from "react";
import { SketchPicker, CirclePicker } from "react-color";
import { RadioControl } from "../RadioControl";

export class ColorPicker extends Component {
  constructor() {
    super();
    this.state = {
      selectedItem: {
        name: "pageColor",
        colorList: [
          "#000000",
          "#e91e63",
          "#9c27b0",
          "#673ab7",
          "#3f51b5",
          "#2196f3",
          "#03a9f4",
          "#00bcd4",
          "#cddc39",
          "#ffeb3b",
          "#ffc107",
        ],
      },
    };
  }

  handleChange(color) {
    const { disableAlpha } = this.props;
    const { hex, rgb } = color;

    if (disableAlpha === false) {
      const rgbColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`;
      let _color = rgb.a < 1 ? rgbColor : hex;
      this.props.onChange(_color);
    } else {
      this.props.onChange(hex);
    }
  }

  handleSelect(selectedItem) {
    this.setState({ selectedItem });
  }

  addColor() {
    const { selectedItem } = this.state;
    const { color } = this.props;

    this.setState({
      selectedItem: {
        ...selectedItem,
        colorList: [...selectedItem.colorList, color],
      },
    });
  }

  render() {
    const { color, disableAlpha } = this.props;
    const { selectedItem } = this.state;

    return (
      <Fragment>
        <div className="editor-x-sketch-picker-wrapper">
          <SketchPicker
            color={color}
            onChange={this.handleChange.bind(this)}
            disableAlpha={disableAlpha ? true : false}
            className="editor-x-sketch-picker"
          />
          <div className="editor-x-color-picker-footer">
            <RadioControl
              value={selectedItem.name}
              onSelect={(selectedItem) => this.handleSelect(selectedItem)}
              iconOnly={true}
              items={[
                {
                  name: "pageColor",
                  title: "Page Color",
                  className: "item-one",
                  colorList: [
                    "#000000",
                    "#e91e63",
                    "#9c27b0",
                    "#673ab7",
                    "#3f51b5",
                    "#2196f3",
                    "#03a9f4",
                    "#00bcd4",
                    "#cddc39",
                    "#ffeb3b",
                    "#ffc107",
                  ],
                },
                {
                  name: "globalColor",
                  title: "Global Color",
                  className: "item-two",
                  colorList: [
                    "#000000",
                    "#4caf50",
                    "#8bc34a",
                    "#cddc39",
                    "#ffeb3b",
                    "#ffc107",
                    "#ff9800",
                    "#ff5722",
                    "#795548",
                    "#607d8b",
                  ],
                },
              ]}
            />

            <div className="editor-x-circle-picker-wrapper" style={{ position: "relative" }}>
              <CirclePicker
                circleSize={16}
                onChange={this.handleChange.bind(this)}
                colors={selectedItem.colorList}
                className="editor-x-circle-picker"
              />
              <div className="editor-x-add-color" onClick={this.addColor.bind(this)}>
                <i className="fas fa-plus"></i>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

ColorPicker.defaultProps = {
  color: "#ffffff",
};

export default ColorPicker;
