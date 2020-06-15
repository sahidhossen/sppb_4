import React, { Component } from "react";
import withInstanceId from "../../lib/withInstanceId";

export class RangeControl extends Component {
  onChange(event) {
    this.props.onChange(event.target.value);
  }

  render() {
    const {
      label,
      value,
      min,
      max,
      step,
      className,
      instanceId,
      disableInput,
    } = this.props;
    const defaultClass = "editor-x-range editor-x-form-controllers";
    const elementClass = [defaultClass, ...(className ? [className] : [])].join(
      " "
    );

    return (
      <div className={elementClass}>
        {label && (
          <label htmlFor={`editor-x-range-control${instanceId}`}>{label}</label>
        )}
        <input
          type="range"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={this.onChange.bind(this)}
        />
        {!disableInput && (
          <input
            type="number"
            id={`editor-x-range-control${instanceId}`}
            value={value}
            min={min}
            max={max}
            step={step}
            autoComplete="off"
            onChange={this.onChange.bind(this)}
          />
        )}
      </div>
    );
  }
}

RangeControl.defaultProps = {
  min: 0,
  max: 100,
  value: 0,
  step: 1,
  className: "",
};

export default withInstanceId(RangeControl);
