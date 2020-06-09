import React, { Component } from "react";
import withInstanceId from "../../lib/withInstanceId";
import SelectCustom from "../SelectCustom";

const isObject = (value) => {
  return (
    typeof value === "object" &&
    value instanceof Object &&
    !(value instanceof Array)
  );
};

class InputControl extends Component {
  constructor(props) {
    super(props);
    this.inputEl = React.createRef();
  }
  onChange(unit = "", event) {
    if (isObject(this.props.value)) {
      if (unit) {
        this.props.onChange({
          value: this.inputEl.current.value,
          unit,
        });
      } else {
        this.props.onChange({
          value: this.inputEl.current.value,
          unit: this.props.value.unit,
        });
      }
    } else {
      this.props.onChange(event.target.value);
    }
  }
  render() {
    const {
      label,
      value,
      unit,
      placeholder,
      instanceId,
      className,
    } = this.props;
    const defaultClass = "sppb-input-text editor-x-form-controllers";
    const elementClass = [defaultClass, ...(className ? [className] : [])].join(
      " "
    );

    const inputValue = isObject(value) ? value.value : value;
    const unitValue = isObject(value) ? value.unit : unit;

    return (
      <div className={elementClass}>
        {label && (
          <label htmlFor={`sppb-input-text${instanceId}`}>{label}</label>
        )}
        <input
          type="text"
          ref={this.inputEl}
          onChange={this.onChange.bind(this, null)}
          value={inputValue}
          id={`sppb-input-text${instanceId}`}
          placeholder={placeholder}
        />
        {isObject(value) && (
          <SelectCustom
            className="select-custom-class"
            value={value.unit}
            options={Object.keys(unit).map((key) => ({
              value: unit[key],
            }))}
            onSelectChange={(value) => this.onChange(value)}
          />
        )}
        {/* <SelectCustom
          options={[
            { value: "px", icon: "far fa-square", selected: true },
            { value: "%", icon: "fas fa-th-large" },
            { value: "em", icon: "fas fa-th" },
            { value: "rem", icon: "far fa-square" },
            { value: "vh", icon: "fas fa-th-large" },
            { value: "vw", icon: "far fa-square" },
          ]}
          value={unitValue}
          // onSelectChange={(value) => {
          //   this.handleChange(value, "select_value");
          // }}
          className="select-custom-class"
        /> */}
      </div>
    );
  }
}

InputControl.defaultProps = {
  value: "",
  className: "",
  placeholder: "Insert text...",
  unit: { px: "Pixel", em: "EM", "%": "%" },
};

export default withInstanceId(InputControl);
