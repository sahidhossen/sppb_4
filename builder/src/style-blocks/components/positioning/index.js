import React from "react";
import { SelectCustom } from "../../../elements";
const Positioning = (props) => {
  return (
    <div className="editor-x-position-style">
      <SelectCustom
        options={[
          { value: "static", selected: true },
          { value: "relative" },
          { value: "fixed" },
          { value: "absolute" },
          { value: "sticky" },
        ]}
      />
      <div className="editor-x-position-preview">
        <p>Nothing to Preview</p>
      </div>
      <div className="editor-x-position-wrapper">
        <div className="editor-x-position-left"></div>
        <div className="editor-x-position-top"></div>
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
    </div>
  );
};

export default Positioning;
