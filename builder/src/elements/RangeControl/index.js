import React, { Component } from "react";
import withInstanceId from "../../lib/withInstanceId";

export class RangeControl extends Component {
  onChange(event) {
    this.props.onChange(event.target.value);
  }

  render() {
    const { label, value, min, max, step, className, instanceId } = this.props;
    const defaultClass = "sppb-range sppb-form-controllers";
    const elementClass = [defaultClass, ...(className ? [className] : [])].join(
      " "
    );

    return (
      <div className={elementClass}>
        {label && (
          <label htmlFor={`sppb-range-control${instanceId}`}>{label}</label>
        )}
        <input
          type="range"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={this.onChange.bind(this)}
        />
        <input
          type="number"
          id={`sppb-range-control${instanceId}`}
          value={value}
          min={min}
          max={max}
          step={step}
          autoComplete="off"
          onChange={this.onChange.bind(this)}
        />
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
