import React, { Component, Fragment } from "react";
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
  }

  toggleColorPicker(event) {
    event.persist();
    this.setState({ isOpen: !this.state.isOpen, event });
  }

  changeBackgroundValue(property, value, index) {
    console.log("oi", property, value);
    const {
      style: { backgroundImages },
      setCssAttributes,
    } = this.props;
    const newData = {
      ...backgroundImages.value[index],
      ...{ [property]: value },
    };

    backgroundImages.value.splice(index, 1, newData);

    console.log("updated", backgroundImages);
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
      <Fragment>
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
          />
        ))}
        <button
          ref={(ref) => {
            this.elememnt = ref;
          }}
          onClick={this.toggleColorPicker.bind(this)}
          className="editor-x-add-background"
        >
          Add New Color
        </button>
        {isOpen && (
          <FloatingComponent
            toggleColorPicker={this.toggleColorPicker.bind(this)}
            event={this.state.event}
            target={this.elememnt}
          >
            <ColorPickerContainer identity="addNew" setCssAttributes={setCssAttributes} />
          </FloatingComponent>
        )}
      </Fragment>
    );
  }
}

export default BackgroundComponent;
