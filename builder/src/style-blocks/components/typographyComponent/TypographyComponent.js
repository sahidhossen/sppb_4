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
    <div className="editor-x-typography-settings">
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
      <div className="editor-x-typography-weight-color">
        <span className="editor-x-typography-weight">Regular</span>
        <div className="editor-x-color-fields">
          <span className="editor-x-color-value"></span>
          <span className="editor-x-color-property">rgba(255, 255, 255, 1)</span>
        </div>
      </div>
      <Divider margin="15px -20px 10px 0" />
      <div className="editor-x-typography-font-size">
        <RangeControl
          label="Size"
          value={"0"}
          // onChange={onValueChangeHandler("value")}
          min={0}
          max={300}
          disableInput={true}
        />
        <InputControl
          // label="H"
          value={{ unit: "rem", value: 1.6 }}
          placeholder={{ value: "0", unit: "px" }}
          // onChange={(value) => onBorderWidthChange(value)}
          // unit={{ px: "px", em: "em" }} // optiona
        />
      </div>
      <div className="editor-x-typography-values">
        <div className="editor-x-typography-lineheight">
          <span className="x-icon-lineheight"></span>
          <InputControl
            // label="Auto"
            placeholder={"Auto"}
            value={{ unit: false, value: "1.6" }}
            // onChange={(value) => this.onChangeSize(value, "maxWidth")}
          />
        </div>
        <div className="editor-x-typography-letterspacing">
          <span className="x-icon-charecter-spacing"></span>
          <InputControl
            // label="Auto"
            placeholder={"Auto"}
            value={{ unit: "-", value: "Auto" }}
            // onChange={(value) => this.onChangeSize(value, "maxWidth")}
          />
        </div>
        <div className="editor-x-typography-paragraph-height">
          <span className="x-icon-paragraph-height"></span>
          <InputControl
            // label="Auto"
            placeholder={"Auto"}
            value={{ unit: "-", value: "Auto" }}
            // onChange={(value) => this.onChangeSize(value, "maxWidth")}
          />
        </div>
      </div>
      <Divider margin="10px -20px 10px 0" />
      <div className="editor-x-typography-align">
        <span className="x-icon-textalign-left"></span>
        <span className="x-icon-textalign-center"></span>
        <span className="x-icon-textalign-right"></span>
        <span className="x-icon-text-justify editor-x-active"></span>
      </div>
    </div>
  );
};

export default TypographyComponent;
