import React, { Component, Fragment } from "react";
import { getBackgroundString, isObject } from "../../../lib/utils";
import FloatingComponent from "../../../helpers/FloatingComponent";
import ColorPickerContainer from "../../../elements/ColorPicker/ColorPickerContainer";

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
    const { type, ...restParams } = this.props;
    const { isOpen } = this.state;

    const background =
      type === "solid"
        ? { backgroundColor: restParams.value }
        : { backgroundImage: getBackgroundString(type, restParams) };

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
              <ColorPickerContainer />
            </FloatingComponent>
          )}
        </div>
      </div>
    );
  }
}
export default BackgroundItem;
