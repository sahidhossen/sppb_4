import React, { Component } from "react";
import withInstanceId from "../../lib/withInstanceId";
import SelectCustom from "../SelectCustom";
import { units } from "../index";

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

  onChange(event) {
    let { value, onChange } = this.props;
    if (isObject(value)) {
      let _value = event.target.value;

      let { unit } = value;
      if (!isNaN(_value) && !unit) unit = "px";

      onChange({ ...value, unit, value: _value });
    } else {
      this.props.onChange(event.target.value);
    }
  }

  onUnitChange(unit) {
    let { onChange, value } = this.props;
    let _value = value.value;
    if (unit === "auto") {
      _value = unit;
      unit = "";
    }
    onChange({ ...value, value: _value, unit });
  }

  render() {
    const { label, value, placeholder, instanceId, className } = this.props;
    const defaultClass = "sppb-input-text editor-x-form-controllers";
    const elementClass = [defaultClass, ...(className ? [className] : [])].join(
      " "
    );

    const inputValue = isObject(value) ? value.value : value;

    let _placeholder = placeholder
      ? placeholder.value
        ? placeholder.value
        : placeholder
      : "";
    console.log("placeholder: ", placeholder);
    return (
      <div className={elementClass}>
        {label && (
          <label htmlFor={`sppb-input-text${instanceId}`}>{label}</label>
        )}
        <input
          type="text"
          ref={this.inputEl}
          onChange={this.onChange.bind(this)}
          value={inputValue || ""}
          id={`sppb-input-text${instanceId}`}
          placeholder={_placeholder}
        />
        {isObject(value) && (
          <SelectCustom
            className="select-custom-class"
            value={value.unit}
            options={units}
            onSelectChange={(value) => this.onUnitChange(value)}
          />
        )}
      </div>
    );
  }
}

InputControl.defaultProps = {
  value: "",
  className: "",
  placeholder: "Insert text...",
  unit: { px: "px", em: "em", "%": "%" },
};

export default withInstanceId(InputControl);
