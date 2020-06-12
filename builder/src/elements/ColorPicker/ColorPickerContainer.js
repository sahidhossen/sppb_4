import React, { Component, Fragment } from "react";
import ColorPicker from "./index";
import RangeWithTwoController from "../RangeWithTwoController";
import RadioControl from "../RadioControl";
import InputControl from "../InputControl";

export class ColorPickerContainer extends Component {
  constructor() {
    super();
    this.state = {
      type: "solid", // solid, linear, radial
      color: "#000",
      controller: "left",
      leftColor: "#000000",
      rightColor: "#ffffff",
      angle: { value: 0, unit: "deg" },
      position: { x: { value: 0, unit: "%" }, y: { value: 0, unit: "%" } },
      extent: "farthest-corner",
      leftColorPosition: { value: 0, unit: "%" },
      rightColorPosition: { value: 100, unit: "%" }
    };

    this.selectController = this.selectController.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
  }

  handleSelect(selectedItem, name) {
    this.setState({ [name]: selectedItem.name });
  }

  selectController(name, color) {
    this.setState({ controller: name, color: color });
  }

  handleAngleChange(value) {
    this.setState({ angle: value });
  }

  handleColorChange(color) {
    const { type, controller } = this.state;

    if (type === "solid") {
      this.setState({ color });
    } else {
      if (controller === "left") {
        this.setState({ leftColor: color, color });
      } else {
        this.setState({ rightColor: color, color });
      }
    }
  }

  handleColorPositionChange(value, name) {
    if (name === "left") {
      this.setState({ leftColorPosition: value });
    } else if (name === "swap") {
      let _leftColor, _rightColor;
      this.setState(state => {
        const { leftColor, rightColor } = state;
        [_leftColor, _rightColor] = [rightColor, leftColor];
        return { leftColor: _leftColor, rightColor: _rightColor };
      });
    } else {
      this.setState({ rightColorPosition: value });
    }
  }

  handlePositionChange(value, name) {
    const { position } = this.state;
    const newValue = { [name]: value };

    this.setState({ position: { ...position, ...newValue } });
  }

  render() {
    const {
      type,
      color,
      leftColor,
      rightColor,
      angle,
      position,
      extent,
      leftColorPosition,
      rightColorPosition
    } = this.state;

    return (
      <div className="editor-x-color-picker-wrapper">
        <RadioControl
          className="editor-x-color-select"
          activeClass="editor-x-active-item"
          // value={background_type_tab}
          value={type}
          onSelect={selectedItem => this.handleSelect(selectedItem, "type")}
          items={[
            {
              title: "solid color",
              name: "solid",
              className: "editor-x-color-select-item-one"
            },
            {
              title: "linear color",
              name: "linear",
              className: "editor-x-color-select-item-two"
            },
            {
              title: "radial color",
              name: "radial",
              className: "editor-x-color-select-item-three"
            },
            {
              name: "image",
              className: "editor-x-color-select-item-four",
              icon: "fas fa-image"
            }
          ]}
        />

        {type !== "solid" && (
          <RangeWithTwoController
            step={2}
            gradientType={type}
            onChange={(value, name) =>
              this.handleColorPositionChange(value, name)
            }
            onClick={(name, color) => this.selectController(name, color)}
            leftColor={leftColor}
            rightColor={rightColor}
            angle={angle}
            extent={extent}
            position={position}
            leftColorPosition={leftColorPosition}
            rightColorPosition={rightColorPosition}
          />
        )}

        {type === "linear" && (
          <div className="editor-x-linear-angle">
            <InputControl
              label="Angle"
              value={angle} // {height: {value:, unit:}} Object | string
              unit={{ deg: "DEG", rad: "RAD", turn: "TURN", grad: "GRAD" }} // optional
              onChange={value => this.handleAngleChange(value)}
            />
          </div>
        )}

        {type === "radial" && (
          <Fragment>
            <div className="editor-x-radial-size">
              <span className="editor-x-radial-position-text">Position</span>
              <RadioControl
                className="editor-x-radio-control"
                activeClass="editor-x-active-item"
                value={extent}
                onSelect={selectedItem =>
                  this.handleSelect(selectedItem, "extent")
                }
                items={[
                  {
                    name: "closest-side",
                    className: "item-one sppb-border-right",
                    icon: "fas fa-arrows-alt-h"
                  },
                  {
                    name: "closest-corner",
                    className: "item-two sppb-border-right",
                    icon: "fas fa-compress-arrows-alt"
                  },
                  {
                    name: "farthest-side",
                    className: "item-three",
                    icon: "fas fa-expand-arrows-alt"
                  },
                  {
                    name: "farthest-corner",
                    className: "item-three",
                    icon: "fas fa-external-link-square-alt"
                  }
                ]}
              />
            </div>

            <div className="editor-x-radial-positions-top-left">
              <InputControl
                label="Left"
                value={position.x} // {height: {value:, unit:}} Object | string
                unit={{ "%": "%", px: "PX", vh: "VH", vw: "VW" }} // optional
                onChange={value => this.handlePositionChange(value, "x")}
              />
              <InputControl
                label="Top"
                value={position.y} // {height: {value:, unit:}} Object | string
                unit={{ "%": "%", px: "PX", vh: "VH", vw: "VW" }} // optional
                onChange={value => this.handlePositionChange(value, "y")}
              />
            </div>
          </Fragment>
        )}

        <ColorPicker
          color={color}
          onChange={color => this.handleColorChange(color)}
          disableAlpha={false}
        />
      </div>
    );
  }
}

export default ColorPickerContainer;
