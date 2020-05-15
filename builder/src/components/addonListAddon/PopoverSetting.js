import React, { Component } from "react";
import ListItem from "../TopBar/Right/RightView/ListItem";

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
    let { event, isSubList, addon } = this.props;
    if (this.contextMenuTimer) {
      clearTimeout(this.contextMenuTimer);
    }
    this.contextMenuTimer = setTimeout(() => {
      const rect = this.contextMenuWrapper.getBoundingClientRect();
      const targetRect = this.props.target.getBoundingClientRect();
      const docRect = document.body.getBoundingClientRect();
      // console.log("wo: ", docRect)
      let leftDistance, topDistance;

      leftDistance = event.clientX + docRect.left;
      topDistance = targetRect.y + targetRect.height;

      // calculating left position
      if (event.clientX + rect.width > docRect.left + docRect.width) {
        leftDistance = event.clientX - rect.width;
      }
      // calculating top position
      if (event.clientY + rect.height > window.innerHeight) {
        topDistance = event.clientY - rect.height;
      }

      this.setState({
        contextStyle: {
          visibility: "visible",
          top: topDistance + "px",
          left: leftDistance + "px"
        }
      });
    });
  }

  render() {
    const { addon } = this.props;
    return (
      <div
        className="editor-x-popup editor-x-settings-popup"
        style={this.state.contextStyle}
        ref={ref => {
          this.contextMenuWrapper = ref;
        }}
      >
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

export default PopoverSetting;
