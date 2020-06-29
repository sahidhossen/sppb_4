import React, { Fragment, useState, useEffect } from "react";
import classNames from "classnames/bind";
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

const DisplayComponent = ({ style, setCssAttributes }) => {
  const { display, alignItems, justifyContent, flexDirection } = style;
  const initialPosition = {
    start: true,
    top: false,
    end: false,
    bottom: false,
    center: false,
  };
  const [selectedPosition, setSelectedPosition] = useState(initialPosition);
  const pairPositions = {
    start: "end",
    end: "start",
    top: "bottom",
    bottom: "top",
  };

  const onChangeDisplayType = (name) => (value) => {
    setCssAttributes({ [name]: value });
  };

  const changePosition = (position) => {
    const totalActive = Object.keys(selectedPosition).reduce((sum, key) => {
      if (selectedPosition[key]) sum++;
      return sum;
    }, 0);
    if (totalActive === 2) {
      setSelectedPosition({ center: true });
    } else {
      setSelectedPosition((prevState) => ({
        ...prevState,
        ...{ [position]: !prevState[position], [pairPositions[position]]: false },
      }));
    }
  };

  const { start, top, end, bottom, center } = selectedPosition;

  return (
    <div className="editor-x-display-style">
      <SelectCustom
        value={display.value}
        options={[
          { value: "inline" },
          { value: "inline-block" },
          { value: "block", selected: true },
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
        onSelectChange={onChangeDisplayType("display")}
      />
      {display.value === "flex" && (
        <Fragment>
          <div className="editor-x-img-preview">
            <div className="editor-x-display-img">{Images.flex}</div>
          </div>
          <div className="editor-x-display-settings">
            <label className="editor-x-panel-heading">Flow</label>
            <div className="editor-x-display-controllers">
              <div className="editor-x-display-control-start">
                <span className={classNames("editor-x-display-control-text", { "editor-x-active": start })}>Start</span>
              </div>
              <div className="editor-x-display-control-top">
                <i className="editor-x-display-reverse-icon x-icon-reverse-down"></i>
                <span className={classNames("editor-x-display-control-text", { "editor-x-active": top })}>Top</span>
              </div>
              <div className="editor-x-display-control-bottom">
                <span className={classNames("editor-x-display-control-text", { "editor-x-active": bottom })}>
                  Bottom
                </span>
              </div>
              <div className="editor-x-display-control-end">
                <span className={classNames("editor-x-display-control-text", { "editor-x-active": end })}>End</span>
                <i className="editor-x-display-reverse-icon x-icon-reverse-left"></i>
              </div>
              <div className="editor-x-side-control-icons">
                <span
                  className={classNames("editor-x-side-control-icon-left", { "editor-x-active": start })}
                  onClick={() => changePosition("start")}
                >
                  <i className="x-icon-align-items-start"></i>
                </span>
                <span
                  className={classNames("editor-x-side-control-icon-top", { "editor-x-active": top })}
                  onClick={() => changePosition("top")}
                >
                  <i className="x-icon-align-items-top"></i>
                </span>
                <span
                  className={classNames("editor-x-side-control-icon-center", { "editor-x-active": center })}
                  onClick={() => changePosition("center")}
                >
                  <i className="x-icon-plus-circle"></i>
                </span>
                <span
                  className={classNames("editor-x-side-control-icon-bottom", { "editor-x-active": bottom })}
                  onClick={() => changePosition("bottom")}
                >
                  <i className="x-icon-align-items-bottom"></i>
                </span>
                <span
                  className={classNames("editor-x-side-control-icon-right", { "editor-x-active": end })}
                  onClick={() => changePosition("end")}
                >
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
              <i className="x-icon-align-content-bottom editor-x-active">
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
                      <i className="x-icon-align-content-bottom editor-x-active">
                        <span className="path1"></span>
                        <span className="path2"></span>
                      </i>
                      <i className="x-icon-align-content-basline">
                        <span className="path1"></span>
                        <span className="path2"></span>
                      </i>
                      <i className="x-icon-justify-center">
                        <span className="path1"></span>
                        <span className="path2"></span>
                      </i>
                    </div>
                  </div>
                </AccordionSection>
              </Accordion>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default DisplayComponent;
