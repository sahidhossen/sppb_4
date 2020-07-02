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
  RadioControl,
} from "../../../elements";

const TypographyComponent = () => {
  return (
    <div className="editor-x-typography-settings">
      <div className="editor-x-img-preview">
        <div className="editor-x-typography-preview">The quick brown fox jumps over the 195 lazy dog</div>
      </div>
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
        <RadioControl
          value="item1"
          // onSelect={(selectedItem) => this.handleSelect(selectedItem, "background_type_tab")}
          noIconTop={true}
          items={[
            {
              name: "item1",
              icon: "x-icon-textalign-left",
            },
            {
              name: "item2",
              icon: "x-icon-textalign-center",
            },
            {
              name: "item3",
              icon: "x-icon-textalign-right",
            },
          ]}
        />
        <RadioControl
          value="item1"
          // onSelect={(selectedItem) => this.handleSelect(selectedItem, "background_type_tab")}
          noIconTop={true}
          items={[
            {
              name: "item1",
              icon: "x-icon-constrain-top",
            },
            {
              name: "item2",
              icon: "x-icon-constrain-middle",
            },
            {
              name: "item3",
              icon: "x-icon-constraint-bottom",
            },
          ]}
        />
      </div>
      <Divider margin="0 -15px 20px 0" />
      <Accordion allowMultipleOpen className="editor-x-advanced-typography">
        <AccordionSection label="Advance Typography Editor" icon="fas fa-angle-right">
          <div className="editor-x-typography-paragraph-advanced-options">
            <p>Paragraph</p>
            <div className="editor-x-typography-paragraph-indent-height">
              <div className="editor-x-typography-paragraph-indent">
                <span className="x-icon-paragraph-indentleft"></span>
                <InputControl
                  label="Indent"
                  placeholder={"Indent"}
                  value={{ unit: "-", value: "0" }}
                  // onChange={(value) => this.onChangeSize(value, "maxWidth")}
                />
              </div>
              <div className="editor-x-typography-paragraph-height">
                <span className="x-icon-paragraph-height1"></span>
                <InputControl
                  label="Height"
                  placeholder={"Height"}
                  value={{ unit: "-", value: "0" }}
                  // onChange={(value) => this.onChangeSize(value, "maxWidth")}
                />
              </div>
            </div>
            <div className="editor-x-typography-direction-mode">
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
              <RadioControl
                value="item1"
                // onSelect={(selectedItem) => this.handleSelect(selectedItem, "background_type_tab")}
                noIconTop={true}
                items={[
                  {
                    name: "item1",
                    icon: "x-icon-writing-mode-horizontal",
                  },
                  {
                    name: "item2",
                    icon: "x-icon-writing-mode-vertical",
                  },
                ]}
              />
            </div>
          </div>
          <Divider margin="0px -15px 5px 0px" />
          <div className="editor-x-typography-overflow">
            <label>Overflow</label>
            <RadioControl
              value="item1"
              // onSelect={(selectedItem) => this.handleSelect(selectedItem, "background_type_tab")}
              noIconTop={true}
              items={[
                {
                  name: "item1",
                  icon: "x-icon-close",
                },
                {
                  name: "item2",
                  icon: "x-icon-text-overflow-eleipsis",
                },
                {
                  name: "item3",
                  icon: "x-icon-text-overflow-clip",
                },
              ]}
            />
          </div>
          <div className="editor-x-typography-word-break">
            <label>Word Breaking</label>
            <SelectCustom
              // value={display.value}
              options={[
                { value: "normal", selected: true },
                { value: "break-all" },
                { value: "keep-all" },
                { value: "break-word" },
                { value: "initial" },
              ]}
              // onSelectChange={onChangeDisplayType("display")}
            />
          </div>
          <div className="editor-x-typography-white-space">
            <label>Space Breaking</label>
            <SelectCustom
              // value={display.value}
              options={[
                { value: "normal", selected: true },
                { value: "nowrap" },
                { value: "pre" },
                { value: "pre-line" },
                { value: "pre-wrap" },
                { value: "initial" },
              ]}
              // onSelectChange={onChangeDisplayType("display")}
            />
          </div>
          <Divider margin="0px -15px 15px 0px" />
          <div className="editor-x-typography-list">
            <div className="editor-x-typography-list-btn">
              <label>List</label>
              <Button isSmall hasIcon="far fa-plus-square" btnText="Image" />
            </div>
            <RadioControl
              value={""}
              value="item1"
              // onSelect={(selectedItem) => this.handleSelect(selectedItem, "background_type_tab")}
              noIconTop={true}
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
          <Divider margin="15px -15px 15px 0" />
          <div className="editor-x-typography-decoration">
            <label>Decoration</label>
            <RadioControl
              value={""}
              value="item1"
              // onSelect={(selectedItem) => this.handleSelect(selectedItem, "background_type_tab")}
              noIconTop={true}
              items={[
                {
                  name: "item1",
                  icon: "x-icon-close",
                },
                {
                  name: "item2",
                  icon: "x-icon-line-under",
                },
                {
                  name: "item3",
                  icon: "x-icon-line-strike",
                },
                {
                  name: "item4",
                  icon: "x-icon-line-over",
                },
                {
                  name: "item5",
                  icon: "x-icon-line-wave",
                },
                {
                  name: "item6",
                  icon: "x-icon-line-dot",
                },
              ]}
            />
          </div>
          <div className="editor-x-typography-case">
            <label>Cases</label>
            <RadioControl
              value={""}
              value="item1"
              // onSelect={(selectedItem) => this.handleSelect(selectedItem, "background_type_tab")}
              noIconTop={true}
              items={[
                {
                  name: "item1",
                  icon: "x-icon-close",
                },
                {
                  name: "item2",
                  icon: "x-icon-uppercase",
                },
                {
                  name: "item3",
                  icon: "x-icon-lowercase",
                },
                {
                  name: "item4",
                  icon: "x-icon-titlecase",
                },
                {
                  name: "item5",
                  icon: "x-icon-smallcaps",
                },
                {
                  name: "item6",
                  icon: "x-icon-forced-smallcaps",
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
