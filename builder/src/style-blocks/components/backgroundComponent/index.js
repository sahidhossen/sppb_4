import React, { Component } from "react";
import BackgroundItem from "./BackgroundItem";
import FloatingComponent from "../../../helpers/FloatingComponent";
import ColorPickerContainer from "../../../elements/ColorPicker/ColorPickerContainer";

export class BackgroundComponent extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      event: null,
    };
    this.addColor = this.addColor.bind(this);
  }

  addColor(type = "solid", data) {
    const {
      style: { backgroundImages },
      setCssAttributes,
    } = this.props;

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
    if (data) {
      backgroundImages.value[backgroundImages.value.length - 1] = data;
    } else {
      backgroundImages.value.push(dataSchema[type]);
    }
    setCssAttributes({
      backgroundImages: backgroundImages.value,
    });
  }

  toggleColorPicker(event) {
    event.persist();

    this.setState({ isOpen: !this.state.isOpen, event }, () => {
      if (this.state.isOpen) {
        this.addColor();
      }
    });
  }

  changeBackgroundValue(property, value, index) {
    // console.log("oi", property, value, index);
    const {
      style: { backgroundImages },
      setCssAttributes,
    } = this.props;

    const newData = {
      ...backgroundImages.value[index],
      ...{ [property]: value },
    };

    backgroundImages.value.splice(index, 1, newData);

    // console.log("updated", backgroundImages);
    setCssAttributes({
      backgroundImages: backgroundImages.value,
    });
  }

  render() {
    const {
      style: { backgroundColor, backgroundImages },
      setCssAttributes,
    } = this.props;
    const { isOpen } = this.state;
    return (
      <div className="editor-x-background-style">
        <BackgroundItem
          type="solid"
          identity="fixed"
          backgroundColor={backgroundColor}
          setCssAttributes={setCssAttributes}
        />
        {backgroundImages.value.map(({ type, ...restProps }, index) => (
          <BackgroundItem
            type={type}
            {...restProps}
            key={index}
            changeBackgroundValue={(key, value) => this.changeBackgroundValue(key, value, index)}
            backgroundImages={backgroundImages}
          />
        ))}
        <button
          ref={(ref) => {
            this.elememnt = ref;
          }}
          onClick={this.toggleColorPicker.bind(this)}
          className="sppb-btn sppb-btn-primary editor-x-add-background-btn"
        >
          Add New Color
        </button>
        {isOpen && (
          <FloatingComponent
            toggleColorPicker={this.toggleColorPicker.bind(this)}
            event={this.state.event}
            target={this.elememnt}
          >
            <ColorPickerContainer
              backgroundImages={backgroundImages}
              addNewColor={this.addColor}
              identity="addNew"
              setCssAttributes={setCssAttributes}
              changeBackgroundValue={(key, value, index) => this.changeBackgroundValue(key, value, index)}
            />
          </FloatingComponent>
        )}
      </div>
    );
  }
}

export default BackgroundComponent;
