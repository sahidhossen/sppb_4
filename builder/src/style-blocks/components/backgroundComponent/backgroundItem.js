import React, { Component, Fragment } from "react";
import { getBackgroundString } from "../../../lib/utils";

class BackgroundItem extends Component {
  render() {
    const { type, ...restParams } = this.props;

    const background =
      type === "solid"
        ? { backgroundColor: restParams.value }
        : { backgroundImage: getBackgroundString(type, restParams) };

    return (
      <Fragment>
        <div className="editor-x-background-item">
          <div className="editor-x-background-item-left">
            <span className="editor-x-background-indicatior"></span>
            <span className="editor-x-background-title">{type}</span>
          </div>
          <div
            className="editor-x-background-item-right"
            style={background}
          ></div>
        </div>
      </Fragment>
    );
  }
}
export default BackgroundItem;
