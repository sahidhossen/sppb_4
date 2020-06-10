import React, { Component, Fragment } from "react";
import { SketchPicker, CirclePicker } from "react-color";
import { RadioControl } from "../RadioControl";

export class ColorPicker extends Component {
  constructor() {
    super();
    this.state = {
      selectedItem: {
        name: "pageColor",
        colorList: [
          "#000000",
          "#e91e63",
          "#9c27b0",
          "#673ab7",
          "#3f51b5",
          "#2196f3",
          "#03a9f4",
          "#00bcd4",
          "#cddc39",
          "#ffeb3b",
          "#ffc107",
        ],
      },
    };
  }

  handleChange(color) {
    this.props.onChange(color);
  }

  handleSelect(selectedItem) {
    this.setState({ selectedItem });
  }

  addColor() {
    const { selectedItem } = this.state;
    const { color } = this.props;

    this.setState({
      selectedItem: {
        ...selectedItem,
        colorList: [...selectedItem.colorList, color],
      },
    });
  }

  render() {
    const { color, disableAlpha } = this.props;
    const { selectedItem } = this.state;

    return (
      <Fragment>
        <div className="color-picker-wrapppe" style={{ marginBottom: "100px" }}>
          <SketchPicker
            color={color}
            onChange={this.handleChange.bind(this)}
            disableAlpha={disableAlpha ? true : false}
          />
          <div className="color-picker-footer">
            <RadioControl
              className="editor-x-radio-control"
              activeClass="editor-x-active-item"
              value={selectedItem.name}
              onSelect={(selectedItem) => this.handleSelect(selectedItem)}
              items={[
                {
                  name: "pageColor",
                  title: "Page Color",
                  className: "item-one editor-x-tab-border-right",
                  colorList: [
                    "#000000",
                    "#e91e63",
                    "#9c27b0",
                    "#673ab7",
                    "#3f51b5",
                    "#2196f3",
                    "#03a9f4",
                    "#00bcd4",
                    "#cddc39",
                    "#ffeb3b",
                    "#ffc107",
                  ],
                },
                {
                  name: "globalColor",
                  title: "Global Color",
                  className: "item-two editor-x-tab-border-right",
                  colorList: [
                    "#000000",
                    "#4caf50",
                    "#8bc34a",
                    "#cddc39",
                    "#ffeb3b",
                    "#ffc107",
                    "#ff9800",
                    "#ff5722",
                    "#795548",
                    "#607d8b",
                  ],
                },
              ]}
            />

            <div
              className="circle-picker-wrapper"
              style={{ position: "relative" }}
            >
              <CirclePicker
                circleSize={16}
                onChange={this.handleChange.bind(this)}
                colors={selectedItem.colorList}
              />
              <div
                className="add-color fas fa-plus-circle"
                onClick={this.addColor.bind(this)}
                style={{
                  fontSize: "16px",
                  position: "absolute",
                  left: 0,
                  top: 0,
                  color: "#ccc",
                  cursor: "pointer",
                }}
              ></div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

ColorPicker.defaultProps = {
  color: "#ffffff",
};

export default ColorPicker;
