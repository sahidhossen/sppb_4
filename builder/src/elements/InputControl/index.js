import React, { Component } from "react";
import classnames from "classnames";
import withInstanceId from "../../lib/withInstanceId";
import SelectCustom from "../SelectCustom";
import { units as defaultUnits } from "../index";

const isObject = (value) => {
  return typeof value === "object" && value instanceof Object && !(value instanceof Array);
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
    const classNames = classnames("editor-x-input-control", "editor-x-form-controllers", className);

    const inputValue = isObject(value) ? value.value : value;

    let _placeholder = placeholder ? (placeholder.value ? placeholder.value : placeholder) : "";
    return (
      <div className={classNames}>
        {label && <label htmlFor={`editor-x-input-control${instanceId}`}>{label}</label>}
        <div className="editor-x-input-control-value">
          <input
            type="text"
            ref={this.inputEl}
            onChange={this.onChange.bind(this)}
            value={inputValue || ""}
            id={`editor-x-input-control${instanceId}`}
            placeholder={_placeholder}
          />
          {isObject(value) && (
            <SelectCustom
              value={value.unit}
              options={defaultUnits}
              onSelectChange={(value) => this.onUnitChange(value)}
            />
          )}
        </div>
      </div>
    );
  }
}

InputControl.defaultProps = {
  value: "",
  className: "",
  placeholder: "",
  unit: { px: "px", em: "em", "%": "%" },
};

export default withInstanceId(InputControl);
