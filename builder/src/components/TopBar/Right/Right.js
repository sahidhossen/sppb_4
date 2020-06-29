import React, { Fragment } from "react";
import RightView from "./RightView";

const Right = () => {
  return (
    <Fragment>
      <RightView />
      <div className="sppb-tobbar-right-preview">
        <i className="x-icon-preview"></i>
        <span className="editor-x-context-text">Preview</span>
      </div>
      <div className="sppb-tobbar-right-publish">
        <button className="sppb-btn sppb-btn-default">Publish</button>
      </div>
      <div className="sppb-tobbar-right-user">
        <span className="editor-x-context-text sppb-right-username">M</span>
      </div>
    </Fragment>
  );
};

export default Right;
