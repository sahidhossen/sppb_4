import React, { Component } from "react";

export class BackgroundItem extends Component {
  render() {
    return (
      <div>
        <div className="editor-x-background-item-left">
          <span className="editor-x-background-indicatior"></span>
          <span className="editor-x-background-title">Solid</span>
        </div>
        <span className="editor-x-background-item-right"></span>
      </div>
    );
  }
}

export default BackgroundItem;
