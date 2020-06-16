import React, { Component, Fragment } from "react";
// import { withSelect, withDispatch } from "store";
import { getBackgroundString } from "../../../lib/utils";
// import { compose } from "../../../components/compose";
import PopoverSetting from "../../../components/AddonListAddon/PopoverSetting";
import SppbPortal from "../../../components/sppbportal/SppbPortal";
import ColorPickerContainer from "../../../elements/ColorPicker/ColorPickerContainer";

class BackgroundItem extends Component {
  constructor() {
    super();
    this.state = {
      isList: false,
      event: null,
    };
  }

  openList(event) {
    event.persist();
    this.setState({ isList: true, event });
    this.props.togglePopoverSettingPanel({
      status: true,
      ref: this.button,
      event,
    });
  }
  reset() {
    this.setState({ isList: false, event: null });
    this.props.togglePopoverSettingPanel({
      status: false,
      ref: null,
      contextMenuWrapper: null,
      event: null,
      contextStyle: null,
    });
  }

  render() {
    const { type, addon, popoverSettingPanel, ...restParams } = this.props;

    const background =
      type === "solid"
        ? { backgroundColor: restParams.value }
        : { backgroundImage: getBackgroundString(type, restParams) };

    return (
      <Fragment>
        <div className="editor-x-background-item">
          <div className="editor-x-background-item-left">
            <span className="editor-x-background-indicatior"></span>
            <span className="editor-x-background-title">{type}</span>
          </div>
          <div
            className="editor-x-background-item-right"
            style={background}
            ref={(ref) => {
              this.button = ref;
            }}
            onClick={this.openList.bind(this)}
          ></div>
        </div>
        {popoverSettingPanel.status && (
          <SppbPortal className="popover">
            <PopoverSetting
              reset={this.reset.bind(this)}
              event={this.state.event}
              target={this.button}
              addon={addon}
            >
              <ColorPickerContainer />
            </PopoverSetting>
          </SppbPortal>
        )}
      </Fragment>
    );
  }
}
export default BackgroundItem;
// export default compose([
//   withSelect((select) => {
//     let { popoverSettingPanel } = select();
//     return {
//       popoverSettingPanel: popoverSettingPanel(),
//     };
//   }),
//   withDispatch((dispatch) => {
//     const { togglePopoverSettingPanel } = dispatch();
//     return {
//       togglePopoverSettingPanel(status) {
//         togglePopoverSettingPanel(status);
//       },
//     };
//   }),
// ])(BackgroundItem);
