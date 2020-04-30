import React from "react";
import {
  InputText,
  RangeControl,
  SelectControl,
  RadioControl,
  TabPanel,
  ColorPicker,
  ColorPalette,
  InputControl,
  Accordion,
  AccordionSection,
  Button,
  SelectCustom,
  ToggleButton,
  RadioButton,
  Checkbox
} from "elements";

class StyleSettings extends React.Component {
  handleChange(value, name) {
    let { setAttributes } = this.props;
    setAttributes({ [name]: value });
  }

  handleColorChange(color, name) {
    let { setAttributes } = this.props;
    let value = color.hex;
    // if alpha is selected then set color value to rgba
    color.rgb.a < 1 && (value = color.rgb);
    setAttributes({ [name]: value });
  }

  handleSelect(selectedItem, name) {
    let { setAttributes } = this.props;
    setAttributes({ [name]: selectedItem.name });
  }

  render() {
    let { addonId, attributes, fields } = this.props;
    console.log(attributes)
    let {
      global_text_color,
      global_background_size,
      border_radius,
      background_type_tab,
      overlay_pattern_color,
      pattern_overlay,
      custom_height,
      radio_value,
      select_value,
      toggle_value,
      checkbox_value
    } = attributes;

    return (
      <div className="sppb-right-setting-wrap">
        
        <h3>Style Setting</h3>
        <ToggleButton
          value={toggle_value}
          onToogleChange={(value) => {
            this.handleChange(value, 'toggle_value');
          }}
        />
        <h3>Radio Setting</h3>
        <RadioButton
          options={
            [
              {label: "Male", value: 'male'},
              {label: "Female", value: 'female', isChecked: true},
              {label: "Third", value: 'third'},
            ]  
          }
          title="Gender"
          value={radio_value}
          onRadioChange={(value) => {
            this.handleChange(value, 'radio_value');
          }}
          className="custom-radio-class dfafdadf dfdfd"
        />
        <h3>Checkbox Setting</h3>
        <Checkbox
          options={
            [
              {label: "Mobile", value: 'mobile'},
              {label: "Laptop", value: 'laptop', isChecked: true},
              {label: "Bike", value: 'bike'},
              {label: "Watch", value: 'watch', isChecked: true},
            ]  
          }
          title="Your gadget list"
          value={checkbox_value}
          onCheckboxChange={(value) => {
            this.handleChange(value, 'checkbox_value');
          }}
          className="checkbox-custom df adfa dfa "
        />
        <ColorPicker
          color={overlay_pattern_color}
          onChange={color =>
            this.handleColorChange(color, "overlay_pattern_color")
          }
        />

        <h3>Custom Select</h3>
        <SelectCustom
          options={[
            {value: 'Option One', icon: "far fa-square"},
            {value: 'Option Two', icon: "fas fa-th-large"},
            {value: 'Option Three', icon: "fas fa-th"},
            {value: 'Option Four', icon: "far fa-square"},
            {value: 'Option Five', icon: "fas fa-th-large", selected: true},
            {value: 'Option Six', icon: "far fa-square"}
          ]}
          
          value={select_value}
          onSelectChange={(value) => {
            this.handleChange(value, 'select_value');
          }}
          className="select-custom-class dfdfa dfafd"
        />

        <RadioControl
          className="radio-control"
          activeClass="active-item"
          value={background_type_tab}
          // value="item1"
          onSelect={selectedItem =>
            this.handleSelect(selectedItem, "background_type_tab")
          }
          items={[
            {
              name: "item1",
              title: "Item 1",
              className: "item-one sppb-border-right",
              icon: "fas fa-magic",
            },
            {
              name: "item2",
              title: "Item 2",
              className: "item-two sppb-border-right",
              icon: "fas fa-feather-alt",
            },
            {
              name: "item3",
              title: "Item 3",
              className: "item-three",
              icon: "fas fa-crop-alt",
            }
          ]}
        />

        {
          <Accordion allowMultipleOpen>
          <AccordionSection label="First accordion" icon="fas fa-angle-right">
            <InputText
            label="global_text_color"
            value={global_text_color}
            className="myClass"
            onChange={value => this.handleChange(value, "global_text_color")}
            />
          </AccordionSection>
          <AccordionSection label="Second accordion" icon="fas fa-angle-right" isOpen>
            Second Accordion Content
          </AccordionSection>
          <AccordionSection label="Third accordion" icon="fas fa-angle-right">
            Third Accordion Content
          </AccordionSection>
          </Accordion>
        }
        <InputControl
          label="custom_height"
          // value={custom_height}
          value={custom_height || { value: 10, unit: "px" }} // {height: {value:, unit:}} Object | string
          unit={{ px: "Pixel", em: "EM" }} // optional
          onChange={value => this.handleChange(value, "custom_height")}
        />

        {
          <InputText
          label="global_text_color"
          value={global_text_color}
          className="myClass"
          onChange={value => this.handleChange(value, "global_text_color")}
          />
        }

        <ColorPalette
          className="custom-class"
          colors={[
            { name: "red", color: "#f00" },
            { name: "white", color: "#fff" },
            { name: "blue", color: "#00f" }
          ]}
          value={pattern_overlay}
          onChange={color => this.handleChange(color, "pattern_overlay")}
        />

        <SelectControl
          label="global_background_size"
          className="mySelector selectorClass"
          value={global_background_size}
          options={[
            { label: "----Select Item----", value: null, disabled: true },
            { label: "Cover", value: "cover" },
            { label: "Contain", value: "contain" },
            { label: "Auto", value: "auto" }
          ]}
          onChange={value => this.handleChange(value, "global_background_size")}
        />

        <RangeControl
          className="myRange rangeClass"
          label="border_radius"
          value={border_radius}
          onChange={value => this.handleChange(value, "border_radius")}
          min={0}
          max={10}
        />

        <TabPanel
          className="tab-panel"
          activeClass="active-tab"
          value={background_type_tab}
          // value="tab1"
          onSelect={selectedTab =>
            this.handleSelect(selectedTab, "background_type_tab")
          }
          tabs={[
            {
              name: "tab1",
              title: "Tab 1",
              className: "tab-one"
            },
            {
              name: "tab2",
              title: "Tab 2",
              className: "tab-two"
            }
          ]}
        >
          {tab => <p>{tab.title}</p>}
        </TabPanel>
      </div>
    );
  }
}

export default StyleSettings;
