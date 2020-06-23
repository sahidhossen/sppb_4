import React, { Component } from "react";
import { getBackgroundString } from "../../../lib/utils";
import FloatingComponent from "../../../helpers/FloatingComponent";
import ColorPickerContainer from "../../../elements/ColorPicker/ColorPickerContainer";
import { Divider } from "../../../elements";

class BackgroundItem extends Component {
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

  render() {
    const {
      type,
      changeBackgroundValue,
      addNewColor,
      backgroundImages,
      setCssAttributes,
      backgroundColor,
      ...restProps
    } = this.props;

    const { isOpen } = this.state;
    const background =
      type === "solid"
        ? { backgroundColor: (backgroundColor && backgroundColor.value) || (restProps.color && restProps.color.value) }
        : { backgroundImage: getBackgroundString(type, restProps) };
    return (
      <div className="editor-x-background-item-wrapper">
        <div className="editor-x-background-drag">
          <i className="fas fa-braille"></i>
        </div>
        <div className="editor-x-background-item">
          <div className="editor-x-background-item-left">
            <span className="editor-x-background-indicatior editor-x-active"></span>
            <span className="editor-x-background-title">{type}</span>
          </div>
          <div
            ref={(ref) => {
              this.elememnt = ref;
            }}
            className="editor-x-background-item-right"
            style={background}
            onClick={this.toggleColorPicker.bind(this)}
          ></div>
          {isOpen && (
            <FloatingComponent
              toggleColorPicker={this.toggleColorPicker.bind(this)}
              event={this.state.event}
              target={this.elememnt}
            >
              <ColorPickerContainer
                type={type}
                addNewColor={addNewColor}
                gradientProps={(!restProps.identity && restProps) || undefined}
                identity={restProps.identity}
                changeBackgroundValue={changeBackgroundValue}
                setCssAttributes={setCssAttributes}
                backgroundColor={backgroundColor}
                backgroundImages={backgroundImages}
              />
            </FloatingComponent>
          )}
        </div>
        <Divider width="100%" margin="0 0 0 15px" />
      </div>
    );
  }
}
export default BackgroundItem;
