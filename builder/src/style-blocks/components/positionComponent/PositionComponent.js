import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { SelectCustom, InputText, Divider, RangeControl } from "../../../elements";
import PositionNumberControl from "./PositionNumberControl";

const PositionComponent = (props) => {
  const { style, setCssAttributes } = props;

  const { position, zIndex } = style;

  const [positionName, setPositionName] = useState(position.value || "relative");
  useEffect(() => {
    setPositionName(position.value);
  }, [position]);
  const onChangePositionName = (name) => (value) => {
    setPositionName(value);
    setCssAttributes({ [name]: value });
  };

  const onChangePositionAttributes = (value) => {
    setCssAttributes(value);
  };
  // console.log("position: ", style);
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
        onSelectChange={onChangePositionName("position")}
      />

      <PositionNumberControl name={positionName} style={style} onChange={onChangePositionAttributes} />

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
        value={1}
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
  addongId: PropTypes.string,
  setCssAttributes: PropTypes.func,
};

export default PositionComponent;
