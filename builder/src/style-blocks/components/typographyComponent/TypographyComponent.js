import React from "react";
import {
  Checkbox,
  Divider,
  ToggleButton,
  Accordion,
  AccordionSection,
  InputControl,
  RangeControl,
  Button,
  InputText,
  SelectCustom,
} from "../../../elements";

const TypographyComponent = () => {
  return (
    <div className="editor-x-typhography-settings">
      <SelectCustom
        // value={display.value}
        options={[
          { value: "Lato" },
          { value: "Open Sans" },
          { value: "Robot", selected: true },
          { value: "Pangolina" },
          { value: "Oswald" },
          { value: "Notable" },
          { value: "Raleway" },
        ]}
        // onSelectChange={onChangeDisplayType("display")}
      />
      <InputText label="Regular" />
      <Divider margin="10px -15px 10px 10px" />
      <RangeControl label="Size" value="10" />
      <div className="editor-x-typhography-values">
        <span className="x-icon-lineheight"></span>
        <span className="x-icon-charecter-spacing"></span>
        <span className="x-icon-paragraph-height"></span>
      </div>
      <div className="editor-x-typhography-align">
        <span className="x-icon-textalign-left"></span>
        <span className="x-icon-textalign-center"></span>
        <span className="x-icon-textalign-right"></span>
        <span className="x-icon-textalign-justify"></span>
      </div>
    </div>
  );
};

export default TypographyComponent;
