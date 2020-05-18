import React, { Fragment } from "react";
import { compose } from "../compose";
import { withSelect, withDispatch } from "store";
import SppbPortal from "../sppbportal/SppbPortal";
import List from "../TopBar/Right/RightView/List";
import PopoverSetting from "./PopoverSetting";

class AddonConfigTag extends React.Component {
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
    let { addon, target, popoverSettingPanel } = this.props;

    return (
      <Fragment>
        <div
          className="sppb-addon-tag"
          ref={(ref) => {
            this.button = ref;
          }}
          style={{ pointerEvents: "auto" }}
          onClick={this.openList.bind(this)}
        >
          <span>{addon.name}</span> <i className="fas fa-cog"></i>
        </div>

        {popoverSettingPanel.status && (
          <SppbPortal className="popover">
            <PopoverSetting
              reset={this.reset.bind(this)}
              event={this.state.event}
              target={this.button}
              addon={addon}
            />
          </SppbPortal>
        )}
      </Fragment>
    );
  }
}

export default compose([
  withSelect((select) => {
    let {
      getMediaQueries,
      getActiveMediaQuery,
      getViewContextList,
      popoverSettingPanel,
    } = select();
    return {
      viewports: getMediaQueries(),
      viewport: getActiveMediaQuery(),
      viewContextList: getViewContextList(),
      popoverSettingPanel: popoverSettingPanel(),
    };
  }),
  withDispatch((dispatch) => {
    const { togglePopoverSettingPanel } = dispatch();
    return {
      togglePopoverSettingPanel(status) {
        togglePopoverSettingPanel(status);
      },
    };
  }),
])(AddonConfigTag);
