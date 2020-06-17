import React, { Component, Fragment } from "react";
import ColorPicker from "./index";
import RangeWithTwoController from "../RangeWithTwoController";
import RadioControl from "../RadioControl";
import InputControl from "../InputControl";

export class ColorPickerContainer extends Component {
  constructor() {
    super();
    this.state = {
      selectedType: "solid", // solid, linear, radial
      color: "#000",
      controller: "left",
      leftColor: "#000000",
      rightColor: "#ffffff",
      angle: { value: 0, unit: "deg" },
      position: { x: { value: 0, unit: "%" }, y: { value: 0, unit: "%" } },
      extent: "farthest-corner",
      leftColorPosition: { value: 0, unit: "%" },
      rightColorPosition: { value: 100, unit: "%" },
    };

    this.selectController = this.selectController.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
  }

  handleSelect(selectedItem, name) {
    this.setState({ [name]: selectedItem.name });
  }

  selectController(name, color) {
    const {
      gradientProps: { stops },
      changeBackgroundValue,
    } = this.props;
    let newColorData = {};
    let newData = [];

    if (name === "left") {
      newColorData = { ...stops[0].color, value: color };
      newData = { ...stops[0], color: newColorData };

      stops.splice(0, 1, newData);
      changeBackgroundValue("stops", stops);
    } else {
      newColorData = { ...stops[1].color, value: color };
      newData = { ...stops[1], color: newColorData };

      stops.splice(1, 1, newData);
      changeBackgroundValue("stops", stops);
    }
    this.setState({ controller: name, color });
  }

  handleAngleChange(value) {
    const { changeBackgroundValue } = this.props;
    changeBackgroundValue("angle", value);
  }

  handleColorChange(color) {
    const { controller } = this.state;
    const { type, identity, setCssAttributes, changeBackgroundValue } = this.props;

    let newColorData = {};
    let newData = [];

    if (type === "solid") {
      if (identity === "fixed") {
        console.log("hi");
        setCssAttributes({
          backgroundColor: color,
        });
      } else {
        this.setState({ color });
      }
    } else {
      const { gradientProps } = this.props;
      if (controller === "left") {
        newColorData = { ...gradientProps.stops[0].color, value: color };
        newData = { ...gradientProps.stops[0], color: newColorData };

        gradientProps.stops.splice(0, 1, newData);
        changeBackgroundValue("stops", gradientProps.stops);
        this.setState({ color });
      } else {
        newColorData = { ...gradientProps.stops[1].color, value: color };
        newData = { ...gradientProps.stops[1], color: newColorData };

        gradientProps.stops.splice(1, 1, newData);
        changeBackgroundValue("stops", gradientProps.stops);
        this.setState({ color });
      }
    }
  }

  handleColorPositionChange(value, name) {
    const {
      gradientProps: { stops },
      changeBackgroundValue,
    } = this.props;
    let newData = {};

    if (name === "left") {
      // this.setState({ leftColorPosition: value });
    } else if (name === "swap") {
      let _leftColor, _rightColor;
      this.setState((state) => {
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
      selectedType,
      color,
      leftColor,
      rightColor,
      controller,
      angle,
      position,
      extent,
      leftColorPosition,
      rightColorPosition,
    } = this.state;
    const { type, backgroundColor, gradientProps, setCssAttributes, identity } = this.props;

    return (
      <div className="editor-x-color-picker-wrapper">
        <RadioControl
          className="editor-x-color-select"
          activeClass="editor-x-active-item"
          // value={background_type_tab}
          value={selectedType}
          onSelect={(selectedItem) => this.handleSelect(selectedItem, "selectedType")}
          items={[
            {
              title: "solid color",
              name: "solid",
              className: "editor-x-color-select-item-one",
            },
            {
              title: "linear color",
              name: "linear-gradient",
              className: "editor-x-color-select-item-two",
            },
            {
              title: "radial color",
              name: "radial-gradient",
              className: "editor-x-color-select-item-three",
            },
            {
              name: "image",
              className: "editor-x-color-select-item-four",
              icon: "fas fa-image",
            },
          ]}
        />

        {(selectedType === "linear-gradient" || selectedType === "radial-gradient") && (
          <RangeWithTwoController
            step={2}
            gradientType={type}
            onChange={(value, name) => this.handleColorPositionChange(value, name)}
            onClick={(name, color) => this.selectController(name, color)}
            leftColor={gradientProps.stops[0].color.value}
            rightColor={gradientProps.stops[1].color.value}
            angle={angle}
            extent={extent}
            position={position}
            leftColorPosition={leftColorPosition}
            rightColorPosition={rightColorPosition}
          />
        )}

        {(type === "linear-gradient" || selectedType === "linear-gradient") && (
          <div className="editor-x-linear-angle">
            <InputControl
              label="Angle"
              value={gradientProps.angle} // {height: {value:, unit:}} Object | string
              unit={{ deg: "DEG", rad: "RAD", turn: "TURN", grad: "GRAD" }} // optional
              onChange={(value) => this.handleAngleChange(value)}
            />
          </div>
        )}

        {(type === "radial-gradient" || selectedType === "radial-gradient") && (
          <Fragment>
            <div className="editor-x-radial-size">
              <span className="editor-x-radial-position-text">Position</span>
              <RadioControl
                className="editor-x-radio-control"
                activeClass="editor-x-active-item"
                value={extent}
                onSelect={(selectedItem) => this.handleSelect(selectedItem, "extent")}
                items={[
                  {
                    name: "closest-side",
                    className: "item-one sppb-border-right",
                    icon: "fas fa-arrows-alt-h",
                  },
                  {
                    name: "closest-corner",
                    className: "item-two sppb-border-right",
                    icon: "fas fa-compress-arrows-alt",
                  },
                  {
                    name: "farthest-side",
                    className: "item-three",
                    icon: "fas fa-expand-arrows-alt",
                  },
                  {
                    name: "farthest-corner",
                    className: "item-three",
                    icon: "fas fa-external-link-square-alt",
                  },
                ]}
              />
            </div>

            <div className="editor-x-radial-positions-top-left">
              <InputControl
                label="Left"
                value={position.x} // {height: {value:, unit:}} Object | string
                unit={{ "%": "%", px: "PX", vh: "VH", vw: "VW" }} // optional
                onChange={(value) => this.handlePositionChange(value, "x")}
              />
              <InputControl
                label="Top"
                value={position.y} // {height: {value:, unit:}} Object | string
                unit={{ "%": "%", px: "PX", vh: "VH", vw: "VW" }} // optional
                onChange={(value) => this.handlePositionChange(value, "y")}
              />
            </div>
          </Fragment>
        )}

        <ColorPicker
          color={(backgroundColor && backgroundColor.value) || color}
          onChange={(color) => this.handleColorChange(color)}
          disableAlpha={false}
        />
      </div>
    );
  }
}

ColorPickerContainer.defaultProps = {
  type: "solid",
};

export default ColorPickerContainer;
