import React, { Component } from "react";

export class TopResizer extends Component {
  render() {
    return (
      <div className="editor-x-top-resizer">
        <div className="editor-x-resizer-left-container">
          <span className="editor-x-resizer-left-handler">
            <i className="fas fa-grip-lines-vertical"></i>
          </span>
          <span className="editor-x-resizer-left-value">0</span>
        </div>
        <div className="editor-x-resizer-right-container">
          <span className="editor-x-resizer-right-value">1080</span>
          <span className="editor-x-resizer-right-handler">
            <i className="fas fa-grip-lines-vertical"></i>
          </span>
        </div>
      </div>
    );
  }
}

export default TopResizer;
