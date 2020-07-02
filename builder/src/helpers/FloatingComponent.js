import React, { Component } from "react";
import EditorXPortal from "../components/portal/EditorXPortal";

class FloatingComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contextStyle: {
        visibility: "none",
      },
      isDragging: false,
    };
    this.contextHeader = React.createRef();
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside.bind(this));
    window.frames["sppb-editor-view"].document.addEventListener("mousedown", this.handleClickOutside.bind(this));
    this.getContextMenuPosition();
    // drag
    this.contextHeader.current.addEventListener("mousedown", this.onMouseDown.bind(this));
    this.contextHeader.current.addEventListener("mouseup", this.onMouseUp.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside.bind(this));
    window.frames["sppb-editor-view"].document.removeEventListener("mousedown", this.handleClickOutside.bind(this));

    // drag
    this.contextHeader.current.removeEventListener("mousedown", this.onMouseDown.bind(this));

    this.contextHeader.current.removeEventListener("mouseup", this.onMouseUp.bind(this));
  }

  onMouseDown(event) {
    event.preventDefault();
    const { isDragging } = this.state;

    if (!isDragging && event.target === event.currentTarget) {
      const contextHeaderRect = this.contextHeader.current.getBoundingClientRect();
      let x = event.clientX - contextHeaderRect.left + 15;
      let y = event.clientY - contextHeaderRect.top;
      this.setState((state) => ({ ...state, isDragging: true, x, y }));
      this.contextHeader.current.addEventListener("mousemove", this.onMouseMove.bind(this));
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

      this.contextHeader.current.removeEventListener("mousemove", this.onMouseMove.bind(this));
    }
  }

  handleClickOutside(event) {
    if (this.contextMenuWrapper && !this.contextMenuWrapper.contains(event.target)) {
      this.props.toggleColorPicker(this.props.event);
    }
  }

  getContextMenuPosition() {
    let { event } = this.props;
    if (this.contextMenuTimer) {
      clearTimeout(this.contextMenuTimer);
    }
    this.contextMenuTimer = setTimeout(() => {
      const rect = this.contextMenuWrapper.getBoundingClientRect();
      const targetRect = this.props.target.getBoundingClientRect();
      const docRect = document.body.getBoundingClientRect();

      let leftDistance = event.clientX + docRect.left;
      let topDistance = targetRect.y; // Right after the element
      // calculating left position
      if (event.clientX + rect.width > docRect.left + docRect.width) {
        leftDistance = event.clientX - rect.width;
      }
      // calculating top position
      if (event.clientY + rect.height > window.innerHeight) {
        topDistance = event.clientY - rect.height / 2;
      }

      this.setState({
        contextStyle: {
          visibility: "visible",
          top: topDistance + "px",
          left: leftDistance + "px",
        },
      });
    });
  }

  render() {
    const { children } = this.props;
    return (
      <EditorXPortal className="popover">
        <div
          className="editor-x-color-picker editor-x-popup"
          style={this.state.contextStyle}
          ref={(ref) => {
            this.contextMenuWrapper = ref;
          }}
        >
          <div className="editor-x-addon-settings-title" ref={this.contextHeader}>
            <i className="x-icon-float-handler"></i>
            Color Pallete
          </div>
          {children}
        </div>
      </EditorXPortal>
    );
  }
}

export default FloatingComponent;
