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
} from "../../../elements";

const DisplayComponent = () => {
  return (
    <div className="editor-x-display-style">
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
            <i className="editor-x-display-reverse-icon fas fa-history"></i>
            <span className="editor-x-display-control-text">Top</span>
          </div>
          <div className="editor-x-display-control-bottom">
            <span className="editor-x-display-control-text">Bottom</span>
          </div>
          <div className="editor-x-display-control-end">
            <span className="editor-x-display-control-text">End</span>
            <i className="editor-x-display-reverse-icon fas fa-history"></i>
          </div>
          <div className="editor-x-display-control-icons">
            <span className="editor-x-display-control-icon-left">
              <i className="fas fa-arrow-left"></i>
            </span>
            <span className="editor-x-display-control-icon-top">
              <i className="fas fa-arrow-up"></i>
            </span>
            <span className="editor-x-display-control-icon-center">
              <i className="fas fa-plus-circle"></i>
            </span>
            <span className="editor-x-display-control-icon-bottom">
              <i className="fas fa-arrow-down"></i>
            </span>
            <span className="editor-x-display-control-icon-right">
              <i className="fas fa-arrow-right"></i>
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
            <i className="editor-x-display-reverse-icon fas fa-history"></i>
            <ToggleButton defaultChecked />
          </div>
        </div>
        <div className="editor-x-display-item-align">
          <i className="fas fa-sort-amount-up"></i>
          <i className="fas fa-sort-alpha-up"></i>
          <i className="fas fa-sort-alpha-down editor-x-active"></i>
          <span className="editor-x-display-item-align-line"></span>
          <i className="fas fa-sort-amount-up"></i>
          <i className="fas fa-sort-alpha-up"></i>
          <i className="fas fa-sort-alpha-down"></i>
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
                  value={{ unit: "--", value: "Auto" }}
                  // onChange={(value) => this.onChangeSize(value, "maxWidth")}
                />
              </div>
              <RangeControl label="Shrink" value="10" className="editor-x-display-flex-range" />
              <RangeControl label="Grow" value="10" />
              <Divider margin="10px -15px 0px 0px" />

            </AccordionSection>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default DisplayComponent;
