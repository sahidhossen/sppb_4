import React, { useState, useEffect } from "react";
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
  RadioControl,
} from "../../../elements";

const TypographyComponent = (props) => {
  const {
    style: { fontFamily },
    fonts,
    setCssAttributes,
  } = props;

  const [fontList, setFontList] = useState([]);

  const updateFontList = () => {
    const listOfFonts = fonts.map((font, index) => {
      return { value: font.family, fallback: font.fallback, label: font.family, index };
    });
    setFontList(listOfFonts);
  };
  useEffect(() => {
    updateFontList();
  }, []);

  const onChangeHandler = (value) => (event) => {};

  // console.log("style", props.style);
  return (
    <div className="editor-x-typography-settings">
      <div className="editor-x-img-preview">
        <div className="editor-x-typography-preview">The quick brown fox jumps over the 195 lazy dog</div>
      </div>
      <SelectCustom value={fontFamily.value} options={fontList} onSelectChange={onChangeHandler("display")} />
      <div className="editor-x-typography-weight-color">
        <span className="editor-x-typography-weight">Color</span>
        <div className="editor-x-color-fields">
          <span className="editor-x-color-value"></span>
          <span className="editor-x-color-property">rgba(255, 255, 255, 1)</span>
        </div>
      </div>
      <Divider margin="15px -15px 10px 0" />
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
      <div className="editor-x-typography-weight">
        <RangeControl
          label="Weight"
          value={"500"}
          // onChange={onValueChangeHandler("value")}
          min={0}
          max={900}
          // disableInput={true}
        />
      </div>
      <div className="editor-x-typography-values">
        <div className="editor-x-typography-lineheight">
          <span className="x-icon-lineheight"></span>
          <InputControl
            label="Line"
            placeholder={"Line"}
            value={{ unit: false, value: "1.6" }}
            // onChange={(value) => this.onChangeSize(value, "maxWidth")}
          />
        </div>
        <div className="editor-x-typography-letterspacing">
          <span className="x-icon-charecter-spacing"></span>
          <InputControl
            label="Charecter"
            placeholder={"Charecter"}
            value={{ unit: "-", value: "0.3" }}
            // onChange={(value) => this.onChangeSize(value, "maxWidth")}
          />
        </div>
      </div>
      <Divider margin="10px -15px 10px 0" />
      <div className="editor-x-typography-align">
        <span className="editor-x-typography-align-text">Allignment</span>
        <div className="editor-x-typography-align-icons">
          <span className="x-icon-textalign-left"></span>
          <span className="x-icon-textalign-center"></span>
          <span className="x-icon-textalign-right"></span>
          <span className="x-icon-text-justify editor-x-active"></span>
        </div>
      </div>
      <div className="editor-x-typography-align editor-x-typography-vertical-align">
        <span className="editor-x-typography-align-text">Constrain</span>
        <div className="editor-x-typography-align-icons">
          <span className="x-icon-constrain-top editor-x-active"></span>
          <span className="x-icon-constrain-middle"></span>
          <span className="x-icon-constraint-bottom"></span>
        </div>
      </div>
      <Divider margin="15px -15px 20px 0" />
      <Accordion allowMultipleOpen>
        <AccordionSection label="Advance Typography Editor" icon="fas fa-angle-right">
          <div className="editor-x-typography-direction">
            <label>Paragraph</label>
            <RadioControl
              value="item1"
              // onSelect={(selectedItem) => this.handleSelect(selectedItem, "background_type_tab")}
              items={[
                {
                  name: "item1",
                  title: "LTR",
                },
                {
                  name: "item2",
                  title: "RTL",
                },
              ]}
            />
          </div>
          <div className="editor-x-typography-indent">
            <span className="x-icon-paragraph-indentleft"></span>
            <InputControl
              label="Indent"
              placeholder={"Indent"}
              value={{ unit: "-", value: "0" }}
              // onChange={(value) => this.onChangeSize(value, "maxWidth")}
            />
          </div>
          <Divider margin="15px -15px 20px 0" />
          <div className="editor-x-typography-list">
            <label>List</label>
            <Button isSmall hasIcon="far fa-plus-square" btnText="Image" />
            <RadioControl
              value={""}
              value="item1"
              // onSelect={(selectedItem) => this.handleSelect(selectedItem, "background_type_tab")}
              iconOnly={true}
              items={[
                {
                  name: "item1",
                  icon: "x-icon-close",
                },
                {
                  name: "item2",
                  icon: "x-icon-list-bullet",
                },
                {
                  name: "item3",
                  icon: "x-icon-list-number",
                },
                {
                  name: "item4",
                  icon: "x-icon-list-dash",
                },
                {
                  name: "item5",
                  icon: "x-icon-list-bullet-indent",
                },
                {
                  name: "item6",
                  icon: "x-icon-list-alphabet",
                },
              ]}
            />
          </div>
        </AccordionSection>
      </Accordion>
    </div>
  );
};

export default TypographyComponent;
