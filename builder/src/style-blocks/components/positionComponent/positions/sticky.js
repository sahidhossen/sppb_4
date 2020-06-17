import React, { Fragment } from "react";
import images from "../assets/images";
const Sticky = (props) => {
  return (
    <Fragment>
      <div className="editor-x-position-preview">
        <div className="editor-x-position-static"> {images.sticky} </div>;
      </div>
      <div className="editor-x-position-wrapper">
        <div className="editor-x-position-left"></div>
        <div className="editor-x-position-top editor-x-position-active"></div>
        <div className="editor-x-position-bottom"></div>
        <div className="editor-x-position-right"></div>
        <div className="editor-x-position-corners">
          <div className="editor-x-position-corner-one">
            <span className="editor-x-position-corner-selector"></span>
            <span className="editor-x-position-corner-selector"></span>
            <span className="editor-x-position-corner-selector"></span>
          </div>
          <div className="editor-x-position-corner-two">
            <span className="editor-x-position-corner-selector"></span>
            <span className="editor-x-position-corner-selector editor-x-position-corner-active"></span>
            <span className="editor-x-position-corner-selector"></span>
          </div>
          <div className="editor-x-position-corner-three">
            <span className="editor-x-position-corner-selector"></span>
            <span className="editor-x-position-corner-selector"></span>
            <span className="editor-x-position-corner-selector"></span>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default Sticky;
