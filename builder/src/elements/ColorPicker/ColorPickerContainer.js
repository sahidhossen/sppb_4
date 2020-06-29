import React, { Component, Fragment } from "react";
import ColorPicker from "./index";
import RangeWithTwoController from "../RangeWithTwoController";
import RadioControl from "../RadioControl";
import InputControl from "../InputControl";
import { cloneDeep } from "lodash";

const dataSchema = {
  solid: { type: "solid", color: { type: "color", value: "#ccc" } },
  "linear-gradient": {
    type: "linear-gradient",
    angle: { unit: "deg", value: 0 },
    stops: [
      { color: { type: "color", value: "#fff" }, position: { unit: "%", value: 0 } },
      { color: { type: "color", value: "#000" }, position: { unit: "%", value: 100 } },
    ],
  },
  "radial-gradient": {
    type: "radial-gradient",
    extent: "closest-corner",
    position: { x: { unit: "%", value: 0 }, y: { unit: "%", value: 0 } },
    stops: [
      { color: { type: "color", value: "#fff" }, position: { unit: "%", value: 0 } },
      { color: { type: "color", value: "#000" }, position: { unit: "%", value: 100 } },
    ],
  },
};

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
    const { identity, addNewColor, backgroundImages } = this.props;
    if (name === "extent") {
      const { changeBackgroundValue } = this.props;

      if (identity === "addNew") {
        changeBackgroundValue("extent", selectedItem.name, backgroundImages.value.length - 1);
      } else {
        changeBackgroundValue("extent", selectedItem.name);
      }
    } else {
      const _dataSchema = cloneDeep(dataSchema);
      const _data = { ..._dataSchema[selectedItem.name] };
      addNewColor(selectedItem.name, _data);

      this.setState({ [name]: selectedItem.name });
    }
  }

  selectController(name, color) {
    const { changeBackgroundValue, identity, backgroundImages } = this.props;
    let newColorData = {};
    let newData = [];

    if (name === "left") {
      if (identity === "addNew") {
        const layer = backgroundImages.value[backgroundImages.value.length - 1];
        newColorData = { ...layer.stops[0].color, value: color };
        newData = { ...layer.stops[0], color: newColorData };

        layer.stops.splice(0, 1, newData);

        changeBackgroundValue("stops", layer.stops, backgroundImages.value.length - 1);
      } else {
        const {
          gradientProps: { stops },
        } = this.props;

        newColorData = { ...stops[0].color, value: color };
        newData = { ...stops[0], color: newColorData };

        stops.splice(0, 1, newData);
        changeBackgroundValue("stops", stops);
      }
    } else {
      if (identity === "addNew") {
        const layer = backgroundImages.value[backgroundImages.value.length - 1];
        newColorData = { ...layer.stops[1].color, value: color };
        newData = { ...layer.stops[1], color: newColorData };

        layer.stops.splice(1, 1, newData);
        changeBackgroundValue("stops", layer.stops, backgroundImages.value.length - 1);
      } else {
        const {
          gradientProps: { stops },
        } = this.props;

        newColorData = { ...stops[1].color, value: color };
        newData = { ...stops[1], color: newColorData };

        stops.splice(1, 1, newData);
        changeBackgroundValue("stops", stops);
      }
    }
    this.setState({ controller: name, color });
  }

  handleAngleChange(value) {
    const { changeBackgroundValue, identity, backgroundImages } = this.props;
    if (identity === "addNew") {
      changeBackgroundValue("angle", value, backgroundImages.value.length - 1);
    } else {
      changeBackgroundValue("angle", value);
    }
  }

  handleColorChange(color) {
    const { controller, selectedType } = this.state;
    const { type, identity, backgroundImages, setCssAttributes, changeBackgroundValue } = this.props;
    let newColorData = {};
    let newData = [];
    if (type === "solid" && selectedType === "solid") {
      if (identity === "fixed") {
        setCssAttributes({
          backgroundColor: color,
        });
      } else {
        changeBackgroundValue("color", { type: "color", value: color }, backgroundImages.value.length - 1);
        this.setState({ color });
      }
    } else {
      const { gradientProps, identity } = this.props;
      if (controller === "left") {
        if (identity === "addNew") {
          const layer = backgroundImages.value[backgroundImages.value.length - 1];
          newColorData = { ...layer.stops[0].color, value: color };
          newData = { ...layer.stops[0], color: newColorData };

          layer.stops.splice(0, 1, newData);
          changeBackgroundValue("stops", layer.stops, backgroundImages.value.length - 1);
        } else {
          newColorData = { ...gradientProps.stops[0].color, value: color };
          newData = { ...gradientProps.stops[0], color: newColorData };

          gradientProps.stops.splice(0, 1, newData);
          changeBackgroundValue("stops", gradientProps.stops);
        }
        this.setState({ color });
      } else {
        if (identity === "addNew") {
          const layer = backgroundImages.value[backgroundImages.value.length - 1];
          newColorData = { ...layer.stops[1].color, value: color };
          newData = { ...layer.stops[1], color: newColorData };

          layer.stops.splice(1, 1, newData);
          changeBackgroundValue("stops", layer.stops, backgroundImages.value.length - 1);
        } else {
          newColorData = { ...gradientProps.stops[1].color, value: color };
          newData = { ...gradientProps.stops[1], color: newColorData };

          gradientProps.stops.splice(1, 1, newData);
          changeBackgroundValue("stops", gradientProps.stops);
        }
        this.setState({ color });
      }
    }
  }

  handleColorPositionChange(value, name) {
    const { identity, changeBackgroundValue, backgroundImages } = this.props;
    let newPositionData = {};
    let newData = {};

    if (name === "left") {
      if (identity === "addNew") {
        const layer = { ...backgroundImages.value[backgroundImages.value.length - 1] };
        newPositionData = { ...layer.stops[0].position, ...value };
        newData = { ...layer.stops[0], ...{ position: newPositionData } };

        layer.stops.splice(0, 1, newData);
        changeBackgroundValue("stops", layer.stops, backgroundImages.value.length - 1);
      } else {
        const {
          gradientProps: { stops },
        } = this.props;

        newPositionData = { ...stops[0].position, ...value };
        newData = { ...stops[0], ...{ position: { ...newPositionData } } };

        stops.splice(0, 1, newData);

        changeBackgroundValue("stops", stops);
      }
    } else if (name === "swap") {
      if (identity === "addNew") {
        const layer = { ...backgroundImages.value[backgroundImages.value.length - 1] };
        let _leftColor = { ...layer.stops[0].color };
        let _rightColor = { ...layer.stops[1].color };

        layer.stops[0].color = _rightColor;
        layer.stops[1].color = _leftColor;

        changeBackgroundValue("stops", layer.stops, backgroundImages.value.length - 1);
      } else {
        const {
          gradientProps: { stops },
        } = this.props;

        let _leftColor = { ...stops[0].color };
        let _rightColor = { ...stops[1].color };

        stops[0].color = _rightColor;
        stops[1].color = _leftColor;
        changeBackgroundValue("stops", stops);
      }
    } else {
      if (identity === "addNew") {
        const layer = backgroundImages.value[backgroundImages.value.length - 1];
        newPositionData = { ...layer.stops[1].position, ...value };
        newData = { ...layer.stops[1], ...{ position: newPositionData } };

        layer.stops.splice(1, 1, newData);
        changeBackgroundValue("stops", layer.stops, backgroundImages.value.length - 1);
      } else {
        const {
          gradientProps: { stops },
        } = this.props;

        newPositionData = { ...stops[1].position, ...value };
        newData = { ...stops[1], ...{ position: newPositionData } };

        stops.splice(1, 1, newData);
        changeBackgroundValue("stops", stops);
      }
    }
  }

  handlePositionChange(value, name) {
    const { identity, changeBackgroundValue, backgroundImages } = this.props;
    const newValue = { [name]: value };

    if (identity === "addNew") {
      const _position = backgroundImages.value[backgroundImages.value.length - 1].position;
      changeBackgroundValue("position", { ..._position, ...newValue }, backgroundImages.value.length - 1);
    } else {
      const {
        gradientProps: { position },
      } = this.props;

      changeBackgroundValue("position", { ...position, ...newValue });
    }
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
    const { type, backgroundColor, backgroundImages, gradientProps, setCssAttributes, identity } = this.props;
    const _gradientProps = backgroundImages && backgroundImages.value[backgroundImages.value.length - 1];
    return (
      <div className="editor-x-color-picker-wrapper">
        {identity !== "fixed" && (
          <RadioControl
            className="editor-x-color-select"
            activeClass="editor-x-active-item"
            value={type || selectedType}
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
        )}
        <div className="editor-x-gradient-control-wrap">
          {(selectedType === "linear-gradient" ||
            selectedType === "radial-gradient" ||
            type === "linear-gradient" ||
            type === "radial-gradient") && (
            <RangeWithTwoController
              step={2}
              gradientType={type}
              onChange={(value, name) => this.handleColorPositionChange(value, name)}
              onClick={(name, color) => this.selectController(name, color)}
              leftColor={
                (gradientProps && gradientProps.stops[0].color.value) ||
                (_gradientProps && _gradientProps.stops[0].color.value)
              }
              rightColor={
                (gradientProps && gradientProps.stops[1].color.value) ||
                (_gradientProps && _gradientProps.stops[1].color.value)
              }
              angle={(gradientProps && gradientProps.angle) || (_gradientProps && _gradientProps.angle) || angle}
              extent={(gradientProps && gradientProps.extent) || (_gradientProps && _gradientProps.extent) || extent}
              position={(gradientProps && gradientProps.position) || position}
              leftColorPosition={
                (gradientProps && gradientProps.stops[0].position) ||
                (_gradientProps && _gradientProps.stops[0].position)
              }
              rightColorPosition={
                (gradientProps && gradientProps.stops[1].position) ||
                (_gradientProps && _gradientProps.stops[1].position)
              }
            />
          )}

          {(type === "linear-gradient" || selectedType === "linear-gradient") && (
            <div className="editor-x-linear-angle">
              <InputControl
                label="Angle"
                value={(gradientProps && gradientProps.angle) || (_gradientProps && _gradientProps.angle) || angle} // {height: {value:, unit:}} Object | string
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
                  value={(gradientProps && gradientProps.extent) || (_gradientProps && _gradientProps.extent) || extent}
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
                  value={
                    (gradientProps && gradientProps.position.x) ||
                    (_gradientProps && _gradientProps.position.x) ||
                    position.x
                  } // {height: {value:, unit:}} Object | string
                  unit={{ "%": "%", px: "PX", vh: "VH", vw: "VW" }} // optional
                  onChange={(value) => this.handlePositionChange(value, "x")}
                />
                <InputControl
                  label="Top"
                  value={
                    (gradientProps && gradientProps.position.y) ||
                    (_gradientProps && _gradientProps.position.y) ||
                    position.y
                  } // {height: {value:, unit:}} Object | string
                  unit={{ "%": "%", px: "PX", vh: "VH", vw: "VW" }} // optional
                  onChange={(value) => this.handlePositionChange(value, "y")}
                />
              </div>
            </Fragment>
          )}
        </div>

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
