import React, { Component } from "react";
import withInstanceId from "../../lib/withInstanceId";

class InputText extends Component {
  onChange(event) {
    this.props.onChange(event.target.value);
  }
  render() {
    const { value, label, placeholder, instanceId, className } = this.props;
    const defaultClass = "sppb-input-text sppb-form-controllers";
    const elementClass = [defaultClass, ...(className ? [className] : [])].join(
      " "
    );

    return (
      <div className={elementClass}>
        {label && (
          <label htmlFor={`sppb-input-text${instanceId}`}>{label}</label>
        )}
        <input
          type="text"
          onChange={this.onChange.bind(this)}
          value={value}
          id={`sppb-input-text${instanceId}`}
          placeholder={placeholder}
        />
      </div>
    );
  }
}

InputText.defaultProps = {
  value: "",
  className: "",
  placeholder: "Insert text...",
};

export default withInstanceId(InputText);
