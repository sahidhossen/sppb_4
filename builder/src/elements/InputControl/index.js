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
    const defaultClass = "sppb-input-text sppb-form-controllers";
    const elementClass = [defaultClass, ...(className ? [className] : [])].join(
      " "
    );

    const inputValue = isObject(value) ? value.value : value;
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
