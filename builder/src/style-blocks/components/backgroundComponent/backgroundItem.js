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
    const {
      type,
      changeBackgroundValue,
      setCssAttributes,
      backgroundColor,
      ...restProps
    } = this.props;

    const { isOpen } = this.state;
    const background =
      type === "solid"
        ? { backgroundColor: backgroundColor.value }
        : { backgroundImage: getBackgroundString(type, restProps) };
    return (
      <Fragment>
        <div className="editor-x-background-item">
          <div className="editor-x-background-item-left">
            <span className="editor-x-background-indicatior"></span>
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
                gradientProps={(!restProps.identity && restProps) || undefined}
                identity={restProps.identity}
                changeBackgroundValue={changeBackgroundValue}
                setCssAttributes={setCssAttributes}
                backgroundColor={backgroundColor}
              />
            </FloatingComponent>
          )}
        </div>
      </Fragment>
    );
  }
}
export default BackgroundItem;
