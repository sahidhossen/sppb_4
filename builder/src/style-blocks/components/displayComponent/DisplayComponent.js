import React, { Fragment, useState, useEffect } from "react";
import classNames from "classnames/bind";
import Images from "./assets";
import { displayData } from "./displayData";
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
  const { display, alignItems, justifyContent, flexDirection, flexWrap, alignContent } = style;
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

  useEffect(() => {
    let selected = Object.keys(selectedPosition)
      .reduce((arr, key) => {
        if (selectedPosition[key]) arr.push(key);
        return arr;
      }, [])
      .join("-");
    let properties = displayData[selected] || displayData["start"];
    Object.keys(properties).forEach((key) => {
      setCssAttributes({ [key]: properties[key] });
    });
  }, [selectedPosition]);

  const changePosition = (position) => {
    const reverse = ["column-reverse", "row-reverse"];
    if (reverse.includes(position)) {
      if (position === "row-reverse") {
        if (flexDirection.value === "row") {
          setCssAttributes({ flexDirection: "row-reverse" });
        } else {
          setCssAttributes({ flexDirection: "row" });
        }
      }
      if (position === "column-reverse") {
        if (flexDirection.value === "column") {
          setCssAttributes({ flexDirection: "column-reverse" });
        } else {
          setCssAttributes({ flexDirection: "column" });
        }
      }
    } else {
      const totalActive = Object.keys(selectedPosition).reduce((sum, key) => {
        if (selectedPosition[key]) sum++;
        return sum;
      }, 0);
      if (totalActive === 2) {
        setSelectedPosition({ ...initialPosition, center: true, start: false });
      } else {
        setSelectedPosition((prevState) => ({
          ...prevState,
          ...{ [position]: !prevState[position], ...(pairPositions[position] && { [pairPositions[position]]: false }) },
        }));
      }
    }
  };

  const toggleProperty = (property) => (_) => {
    const [propertyName, value] = [Object.keys(property)[0], Object.values(property)[0]];
    const { defaultValue, setValue } = value;
    const { value: propValue } = style[propertyName];

    if (propValue !== setValue) {
      setCssAttributes({ [propertyName]: setValue });
    } else {
      setCssAttributes({ [propertyName]: defaultValue });
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
                <i
                  className={classNames("editor-x-display-reverse-icon x-icon-reverse-down", {
                    "editor-x-active": flexDirection.value === "column-reverse",
                  })}
                  onClick={() => changePosition("column-reverse")}
                ></i>
                <span className={classNames("editor-x-display-control-text", { "editor-x-active": top })}>Top</span>
              </div>
              <div className="editor-x-display-control-bottom">
                <span className={classNames("editor-x-display-control-text", { "editor-x-active": bottom })}>
                  Bottom
                </span>
              </div>
              <div className="editor-x-display-control-end">
                <span className={classNames("editor-x-display-control-text", { "editor-x-active": end })}>End</span>
                <i
                  className={classNames("editor-x-display-reverse-icon x-icon-reverse-left", {
                    "editor-x-active": flexDirection.value === "row-reverse",
                  })}
                  onClick={() => changePosition("row-reverse")}
                ></i>
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
            <div className="editor-x-display-flex-align">
              <div className="editor-x-display-flex-align-items">
                <i className="x-icon-justify-stretch editor-x-active">
                  <span className="path1"></span>
                  <span className="path2"></span>
                </i>
                <i className="x-icon-align-content-bottom">
                  <span className="path1"></span>
                  <span className="path2"></span>
                </i>
              </div>
              <span className="editor-x-display-flex-align-line"></span>
              <div className="editor-x-display-flex-align-justify">
                <i className="x-icon-justify-space-evenly">
                  <span className="path1"></span>
                  <span className="path2"></span>
                  <span className="path3"></span>
                  <span className="path4"></span>
                </i>
                <i className="x-icon-justify-space-around">
                  <span className="path1"></span>
                  <span className="path2"></span>
                </i>
              </div>
            </div>
            <Divider margin="20px -15px 0px 0px" />
            <div className="editor-x-display-flex-wrap">
              <label>Wrap</label>
              <div className="editor-x-display-flex-wrap-toggle">
                <i
                  className={classNames("editor-x-display-reverse-icon x-icon-reverse-left", {
                    "editor-x-active": flexWrap.value === "wrap-reverse",
                  })}
                  onClick={toggleProperty({ flexWrap: { defaultValue: "nowrap", setValue: "wrap-reverse" } })}
                ></i>
                <ToggleButton
                  defaultChecked={flexWrap.value === "wrap"}
                  onToogleChange={toggleProperty({ flexWrap: { defaultValue: "nowrap", setValue: "wrap" } })}
                />
              </div>
            </div>
            {(flexWrap.value === "wrap" || flexWrap.value === "wrap-reverse") && (
              <div className="editor-x-display-wrap-item">
                <i
                  className={classNames("x-icon-align-content-start", {
                    "editor-x-active": alignContent.value === "flex-start",
                  })}
                  onClick={() => toggleProperty({ alignContent: { defaultValue: "normal", setValue: "flex-start" } })()}
                >
                  <span className="path1"></span>
                  <span className="path2"></span>
                </i>
                <i
                  className={classNames("x-icon-align-content-center", {
                    "editor-x-active": alignContent.value === "center",
                  })}
                  onClick={() => toggleProperty({ alignContent: { defaultValue: "normal", setValue: "center" } })()}
                >
                  <span className="path1"></span>
                  <span className="path2"></span>
                </i>
                <i
                  className={classNames("x-icon-align-content-bottom", {
                    "editor-x-active": alignContent.value === "flex-end",
                  })}
                  onClick={() => toggleProperty({ alignContent: { defaultValue: "normal", setValue: "flex-end" } })()}
                >
                  <span className="path1"></span>
                  <span className="path2"></span>
                </i>
                <span className="editor-x-display-wrap-item-line"></span>
                <i
                  className={classNames("x-icon-wrap-h-v", {
                    "editor-x-active": alignContent.value === "stretch",
                  })}
                  onClick={() => toggleProperty({ alignContent: { defaultValue: "normal", setValue: "stretch" } })()}
                >
                  <span className="path1"></span>
                  <span className="path2"></span>
                </i>
                <i
                  className={classNames("x-icon-justify-center", {
                    "editor-x-active": alignContent.value === "space-between",
                  })}
                  onClick={() =>
                    toggleProperty({ alignContent: { defaultValue: "normal", setValue: "space-between" } })()
                  }
                >
                  <span className="path1"></span>
                  <span className="path2"></span>
                </i>
                <i
                  className={classNames("x-icon-justify-space-around", {
                    "editor-x-active": alignContent.value === "space-around",
                  })}
                  onClick={() =>
                    toggleProperty({ alignContent: { defaultValue: "normal", setValue: "space-around" } })()
                  }
                >
                  <span className="path1"></span>
                  <span className="path2"></span>
                </i>
              </div>
            )}

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
