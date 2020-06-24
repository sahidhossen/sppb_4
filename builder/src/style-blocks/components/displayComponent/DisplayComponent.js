import React from "react";
import Images from "./assets";
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

const DisplayComponent = () => {
  return (
    <div className="editor-x-display-style">
      <SelectCustom
        value={"inline"}
        options={[
          { value: "inline", selected: true },
          { value: "inline-block" },
          { value: "block" },
          { value: "none" },
          { value: "flex" },
          { value: "grid" },
          { value: "table" },
          { value: "contents" },
          { value: "inline-flex" },
          { value: "inline-grid" },
          { value: "inline-table" },
          { value: "list-item" },
          { value: "run-in" },
          { value: "table-caption" },
          { value: "table-column-group" },
          { value: "table-header-group" },
          { value: "table-footer-group" },
          { value: "table-row-group" },
          { value: "table-cell" },
          { value: "table-column" },
          { value: "table-row" },
          { value: "initial" },
        ]}
        // onSelectChange={onChangePositionName("position")}
      />
      <div className="editor-x-img-preview">
        <div className="editor-x-display-img">{Images.flex}</div>
      </div>
      <div className="editor-x-display-settings">
        <label className="editor-x-panel-heading">Flow</label>
        <div className="editor-x-display-controllers">
          <div className="editor-x-display-control-start">
            <span className="editor-x-display-control-text">Start</span>
          </div>
          <div className="editor-x-display-control-top">
            <i className="editor-x-display-reverse-icon x-icon-reverse-down"></i>
            <span className="editor-x-display-control-text">Top</span>
          </div>
          <div className="editor-x-display-control-bottom">
            <span className="editor-x-display-control-text">Bottom</span>
          </div>
          <div className="editor-x-display-control-end">
            <span className="editor-x-display-control-text">End</span>
            <i className="editor-x-display-reverse-icon x-icon-reverse-left"></i>
          </div>
          <div className="editor-x-display-control-icons">
            <span className="editor-x-display-control-icon-left">
              <i className="x-icon-align-items-start"></i>
            </span>
            <span className="editor-x-display-control-icon-top">
              <i className="x-icon-align-items-top"></i>
            </span>
            <span className="editor-x-display-control-icon-center">
              <i className="x-icon-plus-circle"></i>
            </span>
            <span className="editor-x-display-control-icon-bottom">
              <i className="x-icon-align-items-bottom"></i>
            </span>
            <span className="editor-x-display-control-icon-right">
              <i className="x-icon-align-items-end"></i>
            </span>
          </div>
        </div>
        <div className="editor-x-display-checkbox">
          <Checkbox
            options={[
              {
                label: "Baseline",
                value: "baseline",
                isChecked: false,
              },
            ]}
            value={"baseline"}
            // onCheckboxChange={(value) => {
            //   this.onCheckedOverflow(value);
            // }}
          />
          <span className="editor-x-display-checkbox-line"></span>
          <Checkbox
            options={[
              {
                label: "Stretch",
                value: "stretch",
                isChecked: false,
              },
            ]}
            value={"stretch"}
            // onCheckboxChange={(value) => {
            //   this.onCheckedOverflow(value);
            // }}
          />
        </div>
        <Divider margin="0px -15px 0px 0px" />
        <div className="editor-x-display-flex-wrap">
          <label>Wrap</label>
          <div className="editor-x-display-flex-wrap-toggle">
            <i className="editor-x-display-reverse-icon x-icon-reverse-left"></i>
            <ToggleButton defaultChecked />
          </div>
        </div>
        <div className="editor-x-display-item-align">
          <i className="x-icon-align-content-start">
            <span className="path1"></span>
            <span className="path2"></span>
          </i>
          <i className="x-icon-align-content-center">
            <span className="path1"></span>
            <span className="path2"></span>
          </i>
          <i className="x-icon-align-content-end editor-x-active">
            <span className="path1"></span>
            <span className="path2"></span>
          </i>
          <span className="editor-x-display-item-align-line"></span>
          <i className="x-icon-wrap-h-v">
            <span className="path1"></span>
            <span className="path2"></span>
          </i>
          <i className="x-icon-justify-center">
            <span className="path1"></span>
            <span className="path2"></span>
          </i>
          <i className="x-icon-justify-space-around">
            <span className="path1"></span>
            <span className="path2"></span>
          </i>
        </div>
        <div className="editor-x-display-flex-children">
          <Accordion allowMultipleOpen>
            <AccordionSection label="Flex Children" icon="fas fa-angle-right">
              <div className="editor-x-display-flex-checkbox">
                <Checkbox
                  options={[
                    {
                      label: "Basis Sizing",
                      value: "basis-sizing",
                      isChecked: false,
                    },
                  ]}
                  value={"basis-sizing"}
                  // onCheckboxChange={(value) => {
                  //   this.onCheckedOverflow(value);
                  // }}
                />
                <InputControl
                  // label="Auto"
                  placeholder={"Auto"}
                  value={{ unit: "-", value: "Auto" }}
                  // onChange={(value) => this.onChangeSize(value, "maxWidth")}
                />
              </div>
              <RangeControl label="Shrink" value="10" className="editor-x-display-flex-range" />
              <RangeControl label="Grow" value="10" />
              <Divider margin="10px -15px 5px 0px" />
              <div className="editor-x-display-item-ordering">
                <div className="editor-x-display-inputs">
                  <Checkbox
                    options={[
                      {
                        label: "Ordering",
                        value: "ordering",
                        isChecked: false,
                      },
                    ]}
                    value={"ordering"}
                    // onCheckboxChange={(value) => {
                    //   this.onCheckedOverflow(value);
                    // }}
                  />
                  <InputText placeholder="2" value="2" className="editor-x-display-input-text" />
                </div>
                <div className="editor-x-display-order-btn">
                  <Button isSmall btnText="First" />
                  <Button isSmall btnText="Last" />
                </div>
              </div>
              <Divider margin="5px -15px 5px 0px" />
              <div className="editor-x-display-align-child">
                <Checkbox
                  options={[
                    {
                      label: "Align",
                      value: "align-child",
                      isChecked: false,
                    },
                  ]}
                  value={"align-child"}
                  // onCheckboxChange={(value) => {
                  //   this.onCheckedOverflow(value);
                  // }}
                />
                <div className="editor-x-display-align-child-icons">
                  <i className="x-icon-align-content-start">
                    <span className="path1"></span>
                    <span className="path2"></span>
                  </i>
                  <i className="x-icon-align-content-center">
                    <span className="path1"></span>
                    <span className="path2"></span>
                  </i>
                  <i className="x-icon-align-content-end editor-x-active">
                    <span className="path1"></span>
                    <span className="path2"></span>
                  </i>
                  <i className="x-icon-align-content-basline">
                    <span className="path1"></span>
                    <span className="path2"></span>
                  </i>
                  <i className="x-icon-align-content-bottom">
                    <span className="path1"></span>
                    <span className="path2"></span>
                  </i>
                </div>
              </div>
            </AccordionSection>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default DisplayComponent;
