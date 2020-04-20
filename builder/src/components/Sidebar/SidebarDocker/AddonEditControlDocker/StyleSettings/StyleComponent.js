import React, { Fragment } from 'react';
import {
    InputText,
    RangeControl,
    SelectControl,
    TabPanel,
    ColorPicker,
    ColorPalette
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

    handleSelect(selectedTab, name) {
        let { setAttributes } = this.props;
        setAttributes({ [name]: selectedTab.name });
    }

    render(){
        let {
            addonId, 
            attributes, 
        } = this.props;
        let {
            global_text_color,
            global_background_size,
            border_radius,
            background_type_tab,
            overlay_pattern_color,
            pattern_overlay
        } = attributes
        
        return (
            <Fragment>
                <h3>Style Setting</h3>
                <ColorPicker
                    color={overlay_pattern_color}
                    onChange={color =>
                        this.handleColorChange(color, "overlay_pattern_color")
                    }
                    disableAlpha
                />

                <InputText
                    label="global_text_color"
                    value={global_text_color}
                    className="myClass"
                    onChange={value => this.handleChange(value, "global_text_color")}
                />

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
            </Fragment>
        )
    }
}

export default StyleSettings;