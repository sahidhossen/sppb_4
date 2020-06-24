import React, { Component } from "react";

class ViewportList extends Component {
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
    let { event } = this.props;
    if (this.contextMenuTimer) {
      clearTimeout(this.contextMenuTimer);
    }
    this.contextMenuTimer = setTimeout(() => {
      const rect = this.contextMenuWrapper.getBoundingClientRect();
      const targetRect = this.props.target.getBoundingClientRect();
      const docRect = document.body.getBoundingClientRect();
      // console.log("wo: ", docRect)
      let leftDistance = event.clientX + docRect.left;
      let topDistance = targetRect.y + targetRect.height; // Right after the element
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
          left: leftDistance + "px",
        },
      });
    });
  }

  render() {
    let { viewports, activeViewport } = this.props;
    console.log("viewport", activeViewport)
    return (
      <div
        className="editor-x-context-menu-list editor-x-popup"
        style={this.state.contextStyle}
        ref={(ref) => {
          this.contextMenuWrapper = ref;
        }}
      >
        <ul className="editor-x-context-menu">
          {Object.keys(viewports).map((name) => {
            let viewport = viewports[name];
            const isActive = activeViewport.name === name;
            return (
              <li key={name} onClick={() => this.props.update(name)} className={isActive ? 'editor-x-context-menu-item-active' : false}>
                <div className="editor-x-context-menu-content-wrap">
                  {isActive && <i className="x-icon-check editor-x-context-menu-checkmark"></i>}
                  <div className="editor-x-context-menu-icon">
                    <i className={viewport.icon}></i>
                  </div>
                  <div className="editor-x-context-menu-title-wrap">
                    <span className="editor-x-context-menu-title">
                      {viewport.title}
                    </span>
                    {/*<span className="sppb-viewport-notes">
                      {viewport.value} and down
                    </span>*/}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default ViewportList;
