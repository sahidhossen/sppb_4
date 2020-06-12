import React from "react";
import { getBrowserValue } from "../../index";
import {
  InputControl,
  Accordion,
  AccordionSection,
  Checkbox,
  RadioControl,
} from "../../../elements";

class SizeComponent extends React.Component {
  onChangeSize(value, name) {
    let { setCssAttributes, style } = this.props;
    if (name === "height" || name === "width") {
      let _prevUnit = style[name].value.unit;
      let _prevValue = style[name].value.value;
      if (
        value.value === _prevValue &&
        (_prevUnit === "" || _prevUnit === null)
      ) {
        let browserValue = getBrowserValue(name);
        value = { ...value, value: browserValue.value };
      }
    }
    setCssAttributes({ [name]: value });
  }
  handleSelect(selectedItem, name) {
    let { setCssAttributes } = this.props;
    setCssAttributes({ [name]: selectedItem.name });
  }
  render() {
    let { style } = this.props;
    console.log("size component: ", style);
    let { height, maxHeight, minHeight, width, maxWidth, minWidth } = style;

    return (
      <div className="editor-x-size-component">
        <div className="editor-x-size-height-width">
          <InputControl
            label="W"
            value={width.value}
            placeholder={width.placeholder || null}
            onChange={(value) => this.onChangeSize(value, "width")}
          />
          <span className="editor-x-size-lock">
            <i className="fas fa-link"></i>
          </span>
          <InputControl
            label="H"
            value={height.value}
            placeholder={height.placeholder || null}
            onChange={(value) => this.onChangeSize(value, "height")}
          />
        </div>
        <Accordion allowMultipleOpen>
          <AccordionSection label="Minimum & Maximum" icon="fas fa-angle-right">
            <div className="editor-x-size-height-width">
              <InputControl
                label="min W"
                // value={custom_height}
                value={minWidth.value} // {height: {value:, unit:}} Object | string
                placeholder={minWidth.placeholder || null}
                onChange={(value) => this.onChangeSize(value, "minWidth")}
              />
              <span className="editor-x-size-lock">
                <i className="fas fa-link"></i>
              </span>
              <InputControl
                label="min H"
                placeholder={minHeight.placeholder || null}
                value={minHeight.value}
                onChange={(value) => this.onChangeSize(value, "minHeight")}
              />
            </div>
            <div className="editor-x-size-height-width">
              <InputControl
                label="max W"
                placeholder={maxWidth.placeholder || null}
                value={maxWidth.value} // {height: {value:, unit:}} Object | string
                // unit={{ px: "Pixel", em: "EM" }} // optional
                onChange={(value) => this.onChangeSize(value, "maxWidth")}
              />
              <span className="editor-x-size-lock">
                <i className="fas fa-link"></i>
              </span>
              <InputControl
                label="max H"
                placeholder={maxHeight.placeholder || null}
                value={maxHeight.value}
                onChange={(value) => this.onChangeSize(value, "maxHeight")}
              />
            </div>
          </AccordionSection>
        </Accordion>
        <Checkbox
          options={[{ label: "Overflow", value: "overflow", isChecked: true }]}
          value={"checkbox_value"}
          onCheckboxChange={(value) => {
            // this.onChangeSize(value, "checkbox_value");
          }}
          className="checkbox-custom"
        />
        <RadioControl
          activeClass="editor-x-active-item"
          // value={'background_type_tab'}
          value="item1"
          onSelect={(selectedItem) =>
            this.handleSelect(selectedItem, "background_type_tab")
          }
          items={[
            {
              name: "item1",
              title: "Hidden",
              className: "item-one editor-x-tab-border-right",
            },
            {
              name: "item2",
              title: "Scroll",
              className: "item-two editor-x-tab-border-right",
            },
            {
              name: "item3",
              title: "Auto",
              className: "item-three",
            },
          ]}
        />
      </div>
    );
  }
}

export default SizeComponent;
