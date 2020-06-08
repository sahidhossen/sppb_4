import React, { Component } from "react";
import withInstanceId from "../../lib/withInstanceId";

const RadioItem = ({ className, itemId, onClick, children, icon }) => (
  <button className={className} id={itemId} onClick={onClick}>
    {icon && <span className={icon}></span>}
    {children}
  </button>
);
export class RadioControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: null,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { value, items } = this.props;
    if (value) {
      const defaultRadioItem = items.find((item) => item.name === value);
      defaultRadioItem && this.setState({ selectedItem: defaultRadioItem });
    }
  }

  handleClick(selectedItem) {
    const { onSelect } = this.props;
    this.setState({ selectedItem });
    onSelect(selectedItem);
  }

  render() {
    const { selectedItem } = this.state;
    const { className, activeClass, items, instanceId } = this.props;
    const hasIcon = items.some((el) => el.icon);
    const defaultClass = `editor-x-radio-control editor-x-form-controllers${hasIcon ? ' spp-radio-has-icon' : ''}`;
    const elementClass = [defaultClass, ...(className ? [className] : [])].join(
      " "
    );

    return (
      <React.Fragment>
        <div className={elementClass}>
          {items.map((item) => (
            <RadioItem
              className={[
                item.className,
                ...(selectedItem && selectedItem.name === item.name
                  ? [activeClass]
                  : []),
              ].join(" ")}
              itemId={`${instanceId}-${item.name}`}
              selected={selectedItem && item.name === selectedItem.name}
              key={item.name}
              onClick={() => this.handleClick(item)}
              icon={item.icon ? item.icon : ''}
            >
              {item.title}
            </RadioItem>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

RadioControl.defaultProps = {
  className: "",
  activeClass: "editor-x-active-item",
  value: "",
};

export default withInstanceId(RadioControl);
