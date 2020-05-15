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
      isDragging: false,
    };
    this.contextHeader = React.createRef();
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside.bind(this));
    window.frames["sppb-editor-view"].document.addEventListener(
      "mousedown",
      this.handleClickOutside.bind(this)
    );
    this.getContextMenuPosition();
    // drag
    this.contextHeader.current.addEventListener(
      "mousedown",
      this.onMouseDown.bind(this)
    );
    this.contextHeader.current.addEventListener(
      "mouseup",
      this.onMouseUp.bind(this)
    );
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
    // drag
    this.contextHeader.current.removeEventListener(
      "mousedown",
      this.onMouseDown.bind(this)
    );

    this.contextHeader.current.removeEventListener(
      "mouseup",
      this.onMouseUp.bind(this)
    );
  }

  onMouseDown(event) {
    event.preventDefault();
    const { isDragging } = this.state;

    if (!isDragging && event.target === event.currentTarget) {
      const contextHeaderRect = this.contextHeader.current.getBoundingClientRect();
      let x = event.clientX - contextHeaderRect.left;
      let y = event.clientY - contextHeaderRect.top + 4;

      this.setState((state) => ({ ...state, isDragging: true, x, y }));
      this.contextHeader.current.addEventListener(
        "mousemove",
        this.onMouseMove.bind(this)
      );
    }
  }

  onMouseMove(event) {
    event.preventDefault();
    const { isDragging } = this.state;

    if (isDragging) {
      this.setState((state) => ({
        ...state,
        contextStyle: {
          visibility: "visible",
          top: event.clientY - this.state.y + "px",
          left: event.clientX - this.state.x + "px",
        },
      }));
    }
  }

  onMouseUp(event) {
    event.preventDefault();
    if (this.state.isDragging) {
      this.setState((state) => ({ ...state, isDragging: false }));

      this.contextHeader.current.removeEventListener(
        "mousemove",
        this.onMouseMove.bind(this)
      );
      this.props.togglePopoverSettingPanel({
        contextStyle: this.state.contextStyle,
      });
    }
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
    let { popoverSettingPanel } = this.props;
    const { event, contextStyle } = popoverSettingPanel;
    if (this.contextMenuTimer) {
      clearTimeout(this.contextMenuTimer);
    }

    const docRect = document.body.getBoundingClientRect();
    // console.log("wo: ", docRect)
    let leftDistance, topDistance;

    leftDistance = event.clientX + docRect.left;
    topDistance = event.clientY;

    if (!contextStyle) {
      this.setState({
        contextStyle: {
          visibility: "visible",
          top: topDistance + "px",
          left: leftDistance + "px",
        },
      });
    } else {
      this.setState({
        contextStyle: { ...contextStyle },
      });
    }
  }

  render() {
    const { addon } = this.props;
    return (
      <div
        className="editor-x-popup editor-x-settings-popup"
        style={this.state.contextStyle}
        ref={(ref) => {
          this.contextMenuWrapper = ref;
        }}
      >
        <div className="editor-x-addon-settings-wrapper">
          <div
            className="editor-x-addon-settings-title"
            ref={this.contextHeader}
          >
            {/* <i className="fas fa-cog"></i> */}
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
