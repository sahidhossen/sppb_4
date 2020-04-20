import React, { Component } from "react";
import withInstanceId from "../../lib/withInstanceId";

class SelectControl extends Component {
  onChange(event) {
    if (Array.isArray(this.props.value)) {
      const defaultValue = [
        ...new Set(
          this.props.value.reduce((acc, value) => acc.concat(value), [])
        )
      ];
      const value = [
        ...new Set([
          ...defaultValue,
          ...[...event.target.selectedOptions].map(o => o.value)
        ])
      ];
      this.props.onChange(value);
    } else {
      this.props.onChange(event.target.value);
    }
  }

  render() {
    const { label, className, value, options, instanceId } = this.props;
    const defaultClass = "sppb-select";
    const elementClass = [defaultClass, ...(className ? [className] : [])].join(
      " "
    );

    let multiple = null;
    let selectValue = value;
    if (Array.isArray(value)) {
      multiple = true;
      selectValue = value.reduce((acc, val) => acc.concat(val), []);
    }
    const renderOptions = options.map((option, index) => {
      return (
        <option
          key={index}
          value={option.value}
          disabled={option.disabled ? true : null}
        >
          {option.label}
        </option>
      );
    });

    return (
      <div className={elementClass}>
        {label && <label htmlFor={`sppb-select${instanceId}`}>{label}</label>}
        <select
          id={`sppb-select${instanceId}`}
          multiple={multiple}
          value={selectValue}
          onChange={this.onChange.bind(this)}
        >
          {renderOptions}
        </select>
      </div>
    );
  }
}

SelectControl.defaultProps = {
  className: ""
};

export default withInstanceId(SelectControl);
