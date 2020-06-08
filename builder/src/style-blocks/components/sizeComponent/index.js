import React from "react";
import { InputControl, Accordion, AccordionSection, Checkbox, RadioControl } from "../../../elements";

export default class SizeComponent extends React.Component {
  handleChange(value, name) {
    let { setAttributes } = this.props;
    setAttributes({ [name]: value });
  }
  handleSelect(selectedItem, name) {
    let { setAttributes } = this.props;
    setAttributes({ [name]: selectedItem.name });
  }
  render() {
    return (
      <div className="editor-x-size-component">
        <div className="editor-x-size-height-width">
          <InputControl
            label="W"
            // value={custom_height}
            value={{ value: 380, unit: "px" }} // {height: {value:, unit:}} Object | string
            // unit={{ px: "Pixel", em: "EM" }} // optional
            onChange={value => this.handleChange(value, "custom_height")}
          />
          <span className="editor-x-size-lock">
            <i className="fas fa-link"></i>
          </span>
          <InputControl
            label="H"
            // value={custom_height}
            value={{ value: 250, unit: "px" }}
            onChange={value => this.handleChange(value, "custom_height")}
          />
        </div>
        <Accordion allowMultipleOpen>
          <AccordionSection label="Minimum & Maximum" icon="fas fa-angle-right">
            <div className="editor-x-size-height-width">
              <InputControl
                label="min W"
                // value={custom_height}
                value={{ value: 0, unit: "px" }} // {height: {value:, unit:}} Object | string
                // unit={{ px: "Pixel", em: "EM" }} // optional
                onChange={value => this.handleChange(value, "custom_height")}
              />
              <span className="editor-x-size-lock">
                <i className="fas fa-link"></i>
              </span>
              <InputControl
                label="min H"
                // value={custom_height}
                value={{ value: 0, unit: "px" }}
                onChange={value => this.handleChange(value, "custom_height")}
              />
            </div>
            <div className="editor-x-size-height-width">
              <InputControl
                label="max W"
                // value={custom_height}
                value={{ value: 0, unit: "px" }} // {height: {value:, unit:}} Object | string
                // unit={{ px: "Pixel", em: "EM" }} // optional
                onChange={value => this.handleChange(value, "custom_height")}
              />
              <span className="editor-x-size-lock">
                <i className="fas fa-link"></i>
              </span>
              <InputControl
                label="max H"
                // value={custom_height}
                value={{ value: 0, unit: "px" }}
                onChange={value => this.handleChange(value, "custom_height")}
              />
            </div>
          </AccordionSection>
        </Accordion>
        <Checkbox
          options={[
            { label: "Overflow", value: "overflow", isChecked: true }
          ]}
          value={'checkbox_value'}
          onCheckboxChange={(value) => {
            this.handleChange(value, "checkbox_value");
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
