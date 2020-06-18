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
  }

  toggleColorPicker(event) {
    event.persist();
    this.setState({ isOpen: !this.state.isOpen, event });
  }
  render() {
    const {
      style: { backgroundColor, backgroundImages },
    } = this.props;
    const { isOpen } = this.state;

    return (
      <div className="editor-x-background-style">
        <BackgroundItem type="solid" {...backgroundColor} />
        {backgroundImages.value.map(({ type, ...restProps }, index) => (
          <BackgroundItem type={type} {...restProps} key={index} />
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
            <ColorPickerContainer />
          </FloatingComponent>
        )}
      </div>
    );
  }
}

export default BackgroundComponent;
