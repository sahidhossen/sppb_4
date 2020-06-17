import React from "react";
import { SelectCustom, InputText, Divider, RangeControl } from "../../../elements";
import * as positions from "./positions";

const positionComponent = (props) => {
  const [positionName, setPositionName] = useState(initialState);
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
        {/*<p>Nothing to Preview</p>*/}
        <StaticPos />
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
      <Divider margin="15px -10px 15px 10px" />
      <InputText
        label="Containing Element"
        value="Itself"
        className="editor-x-position-contain-elm"
        // onChange={(value) =>
        //   this.handleChange(value, "global_text_color")
        // }
        // placeholder="Itself"
      />
      <Divider margin="15px -10px 15px 10px" />
      <RangeControl
        label="z-index"
        value="500"
        // onChange={(value) => this.handleChange(value, "border_radius")}
        min={0}
        max={99999}
      />
      <Divider margin="15px -15px" />
    </div>
  );
};

export default positionComponent;
