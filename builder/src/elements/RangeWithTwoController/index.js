import React, { Component } from "react";

export class RangeWithTwoController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      swap: false,
    };
  }

  handleSwap() {
    this.setState({ swap: !this.state.swap });
    this.props.onChange({}, "swap");
  }

  handleChange(event) {
    const targetName = event.target.name;
    const targetValue = parseInt(event.target.value);
    const { leftColorPosition, rightColorPosition } = this.props;

    if (targetName === "left" && targetValue > rightColorPosition.value) {
      this.props.onChange({ value: targetValue, unit: "%" }, "right");
    } else if (targetName === "right" && targetValue < leftColorPosition.value) {
      this.props.onChange({ value: targetValue, unit: "%" }, "left");
    } else {
      this.props.onChange(
        {
          value: targetValue,
          unit: "%",
        },
        targetName
      );
    }
  }

  handleClick(color, event) {
    event.preventDefault();

    this.props.onClick(event.target.name, color);
  }

  render() {
    let gradiant;
    let {
      step,
      gradientType,
      leftColor,
      rightColor,
      angle,
      extent,
      leftColorPosition,
      rightColorPosition,
    } = this.props;

    if (gradientType === "radial") {
      const {
        position: { x, y },
      } = this.props;

      gradiant = `radial-gradient(circle ${extent} at ${x.value}${x.unit} ${y.value}${y.unit}, ${leftColor} ${leftColorPosition.value}%, ${rightColor} ${rightColorPosition.value}%)`;
    } else {
      // linear
      if (angle && angle.value !== 0) {
        gradiant = `linear-gradient(${angle.value}${angle.unit}, ${leftColor} ${leftColorPosition.value}%, ${rightColor} ${rightColorPosition.value}%)`;
      } else {
        gradiant = `linear-gradient(to right, ${leftColor} ${leftColorPosition.value}%, ${rightColor} ${rightColorPosition.value}%)`;
      }
    }

    return (
      <div className="editor-x-range-slider">
        <div className="editor-x-range-slider-control-panel">
          <input
            value={leftColorPosition.value}
            min="0"
            max="100"
            step={step}
            type="range"
            name="left"
            onChange={this.handleChange.bind(this)}
            onClick={this.handleClick.bind(this, leftColor)}
            style={{ background: gradiant }}
          />
          <input
            value={rightColorPosition.value}
            min="0"
            max="100"
            step={step}
            type="range"
            name="right"
            onChange={this.handleChange.bind(this)}
            onClick={this.handleClick.bind(this, rightColor)}
            style={{ background: gradiant }}
          />
        </div>
        <div className="editor-x-range-slider-bottom">
          <div className="editor-x-range-slider-swap fas fa-sync-alt" onClick={this.handleSwap.bind(this)}></div>
        </div>
      </div>
    );
  }
}

RangeWithTwoController.defaultProps = {
  step: 1,
  gradientType: "linear",
  leftColor: "#000000",
  rightColor: "#ffffff",
  angle: { value: 0, unit: "deg" },
};

export default RangeWithTwoController;
