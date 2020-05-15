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
        visibility: "none"
      }
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
        left: leftDistance + "px"
      }
    });
  }

  render() {
    const { addon, togglePopoverSettingPanel } = this.props;
    return (
      <div
        className="editor-x-popup editor-x-settings-popup"
        style={this.state.contextStyle}
        ref={ref => {
          this.contextMenuWrapper = ref;
        }}
      >
        <div class="sppb-sidebar-icons">
          <span class="sppb-drag-icon">
            <i class="fas fa-braille"></i>
          </span>
          <span class="sppb-sidebar-panel-icon">
            <i class="fas fa-columns"></i>
            <i class="fas fa-columns"></i>
            <i class="fas fa-columns"></i>
          </span>
        </div>
        <div className="editor-x-addon-settings-tab-panel">
          <ul>
            <li>Addons</li>
            <li>Navigator</li>
            <li>Bookmark</li>
          </ul>
        </div>

        <div className="editor-x-addon-settings-wrapper">
          <div className="editor-x-addon-settings-title">
            <i className="fas fa-cog"></i>
            {addon.name}
          </div>
          <div className="editor-x-addon-settings-content">
            Addon Content...
          </div>
          <div className="editor-x-addon-settings-footer">
            footer section...
          </div>
        </div>
      </div>
    );
  }
}

export default compose([
  withSelect(select => {
    let { popoverSettingPanel } = select();
    return {
      popoverSettingPanel: popoverSettingPanel()
    };
  }),
  withDispatch(dispatch => {
    const { togglePopoverSettingPanel } = dispatch();
    return {
      togglePopoverSettingPanel(status) {
        togglePopoverSettingPanel(status);
      }
    };
  })
])(PopoverSetting);
