import React, { Component } from "react";
import ListItem from "../TopBar/Right/RightView/ListItem";
import { compose } from "../compose";
import { withSelect, withDispatch } from "store";

class PopoverSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      contextStyle: {
        visibility: "none",
      },
    };
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside.bind(this));
    window.frames["sppb-editor-view"].document.addEventListener(
      "mousedown",
      this.handleClickOutside.bind(this)
    );
    this.getContextMenuPosition();
  }

  componentWillUnmount() {
    document.removeEventListener(
      "mousedown",
      this.handleClickOutside.bind(this)
    );
    window.frames["sppb-editor-view"].document.removeEventListener(
      "mousedown",
      this.handleClickOutside.bind(this)
    );
  }

  handleClickOutside(event) {
    if (
      this.contextMenuWrapper &&
      !this.contextMenuWrapper.contains(event.target)
    ) {
      this.props.reset();
    }
  }

  getContextMenuPosition() {
    let { isSubList, addon, popoverSettingPanel } = this.props;
    const { event, ref } = popoverSettingPanel;
    if (this.contextMenuTimer) {
      clearTimeout(this.contextMenuTimer);
    }
    // const rect = this.contextMenuWrapper.getBoundingClientRect();
    const targetRect = ref.getBoundingClientRect();
    const docRect = document.body.getBoundingClientRect();
    // console.log("wo: ", docRect)
    let leftDistance, topDistance;

    leftDistance = event.clientX + docRect.left;
    topDistance = event.clientY;

    // calculating left position
    // if (event.clientX + rect.width > docRect.left + docRect.width) {
    //   leftDistance = event.clientX - rect.width;
    // }
    // // calculating top position
    // if (event.clientY + rect.height > window.innerHeight) {
    //   topDistance = event.clientY - rect.height;
    // }
    this.setState({
      contextStyle: {
        visibility: "visible",
        top: topDistance + "px",
        left: leftDistance + "px",
      },
    });
  }

  render() {
    const { addon, togglePopoverSettingPanel } = this.props;
    return (
      <div
        className="editor-x-viewport-list editor-x-popup"
        style={this.state.contextStyle}
        ref={(ref) => {
          this.contextMenuWrapper = ref;
        }}
      >
        <div className="popover-setting__header">{addon.name}</div>
        <div className="popover-setting__content">Addon Content...</div>
        <div className="popover-setting__footer">footer section...</div>
      </div>
    );
  }
}

export default compose([
  withSelect((select) => {
    let { popoverSettingPanel } = select();
    return {
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
])(PopoverSetting);
