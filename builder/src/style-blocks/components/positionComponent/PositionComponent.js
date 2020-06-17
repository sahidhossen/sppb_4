import React, { useState } from "react";
import PropTypes from "prop-types";
import { SelectCustom, InputText, Divider, RangeControl } from "../../../elements";
import { Relative, Static, Fixed, Absolute, Sticky } from "./positions";

const PositionComponent = (props) => {
  const { style, setCssAttributes } = props;

  const { position } = style;

  const [positionName, setPositionName] = useState(position || "relative");

  const onChangePositionName = (value) => {
    setPositionName(value);
  };

  const onChangePositionAttributes = (value) => {
    console.log("position chagned: ", value);
  };

  let PositionTypeComponent = null;

  if (positionName === "relative") {
    PositionTypeComponent = Relative;
  } else if (positionName === "sticky") {
    PositionTypeComponent = Sticky;
  } else if (positionName === "fixed") {
    PositionTypeComponent = Fixed;
  } else if (positionName === "absolute") {
    PositionTypeComponent = Absolute;
  } else if (positionName === "static") {
    PositionTypeComponent = Static;
  }

  return (
    <div className="editor-x-position-style">
      <SelectCustom
        value={positionName}
        options={[
          { value: "static", selected: true },
          { value: "relative" },
          { value: "fixed" },
          { value: "absolute" },
          { value: "sticky" },
        ]}
        onSelectChange={onChangePositionName}
      />
      {PositionTypeComponent !== null && (
        <PositionTypeComponent settings={style} onChange={onChangePositionAttributes} />
      )}

      <Divider margin="15px -10px 15px 10px" />
      <InputText
        label="Containing Element"
        value={"Its self"}
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

PositionComponent.propTypes = {
  style: PropTypes.object,
  setCssAttributes: PropTypes.func,
};

export default PositionComponent;
