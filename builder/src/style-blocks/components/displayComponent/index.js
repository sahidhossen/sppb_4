import React from "react";
import Images from "./assets";
const DisplayComponent = () => {
  return (
    <div className="editor-x-display-style">
      <div className="editor-x-img-preview">
        <div className="editor-x-display-img">{Images.flex}</div>
      </div>
      <div className="editor-x-display-settings">
        <label className="editor-x-panel-heading">Flow</label>
        <div className="editor-x-display-controllers">
          <div className="editor-x-display-control-start">
            <span className="editor-x-display-control-text">Start</span>
          </div>
          <div className="editor-x-display-control-top">
            <i className="fas fa-history"></i>
            <span className="editor-x-display-control-text">Top</span>
          </div>
          <div className="editor-x-display-control-bottom">
            <span className="editor-x-display-control-text">Bottom</span>
          </div>
          <div className="editor-x-display-control-end">
            <span className="editor-x-display-control-text">End</span> <i className="fas fa-history"></i>
          </div>
          <div className="editor-x-display-control-icons">
            <span className="editor-x-display-control-icon-left">
              <i className="fas fa-arrow-left"></i>
            </span>
            <span className="editor-x-display-control-icon-top">
              <i className="fas fa-arrow-up"></i>
            </span>
            <span className="editor-x-display-control-icon-center"><i class="fas fa-plus-circle"></i></span>
            <span className="editor-x-display-control-icon-bottom">
              <i className="fas fa-arrow-down"></i>
            </span>
            <span className="editor-x-display-control-icon-right">
              <i className="fas fa-arrow-right"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayComponent;
