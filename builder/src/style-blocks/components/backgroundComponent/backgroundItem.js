import React, { Component } from "react";

export class BackgroundItem extends Component {
  render() {
    return (
      <div>
        <div className="background-item-left">
          <span className="background-indicatior"></span>
          <span className="background-title">Solid</span>
        </div>
        <span className="background-item-right"></span>
      </div>
    );
  }
}

export default BackgroundItem;
