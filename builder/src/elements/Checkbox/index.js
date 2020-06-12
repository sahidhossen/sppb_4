import React from "react";
import CheckboxItem from "./CheckboxItem";
class Checkbox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checkedItems: {},
    };

    this.handleOnChange = this.handleOnChange.bind(this);
  }

  /**
   * Setting intial moment checkbox value
   */
  componentDidMount() {
    const { options } = this.props;
    const { checkedItems } = this.state;

    options.map((option) => {
      const item = option.value;
      const isChecked = option.isChecked;

      if (option.isChecked) {
        this.setState(Object.assign(checkedItems, { [item]: isChecked }));
      }
    });
  }

  //Handling checkbox change
  handleOnChange(event) {
    const { onCheckboxChange } = this.props;
    const { checkedItems } = this.state;

    const item = event.target.value;
    const isChecked = event.target.checked;

    this.setState(Object.assign(checkedItems, { [item]: isChecked }));
    onCheckboxChange(checkedItems);
  }

  render() {
    const { options, title, className } = this.props;
    const { checkedItems } = this.state;
    return (
      <div className={`editor-x-checkbox${className ? " " + className : ""}`}>
        {title && <h3 className="editor-x-checkbox-title">{title}</h3>}
        <div className="editor-x-checkbox-wrap">
          {options.map((option, key) => {
            return (
              <CheckboxItem
                name={option.label}
                checked={checkedItems[option.value]}
                onChange={this.handleOnChange}
                id={`${option.label}-${key}`}
                value={option.value}
                key={`checkbox-${key}`}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

Checkbox.defaultProps = {
  options: [
    { label: "Checkbox 1", value: "checkbox-1" },
    { label: "Checkbox 2", value: "checkbox-2", isChecked: true },
    { label: "Checkbox 3", value: "checkbox-3" },
  ],
};

export default Checkbox;
