import React, { Component } from "react";
import classnames from 'classnames';
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
      value: null,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { value, items, disabled } = this.props;
    if (value && !disabled) {
      const defaultRadioItem = items.find((item) => item.name === value);
      defaultRadioItem && this.setState({ value: defaultRadioItem });
    }
  }

  static getDerivedStateFromProps(prevProps, state) {
    const { value, items } = prevProps;
    if (state.value !== null && (value !== state.value.name) ) {
      const defaultRadioItem = items.find((item) => item.name === value);
      return { value: defaultRadioItem || null };
    }
    return state;
  }

  handleClick(value) {
    const { onSelect, disabled } = this.props;
    if (disabled) 
      return;

    this.setState({ value });
    onSelect(value);
  }

  render() {
    const { value } = this.state;
    const { className, activeClass, items, instanceId, disabled, iconOnly } = this.props;
    const hasIcon = items.some((el) => el.icon);

    const elementClass = classnames(
        {'editor-x-radio-control': true, 
        'sppb-form-controllers': true, 
        'spp-radio-has-icon': hasIcon && !iconOnly,
        'editor-x-radio-control-disable': disabled
      }, className);


    return (
      <React.Fragment>
        <div className={elementClass}>
          {items.map((item) => (
            <RadioItem
              className={[
                item.className,
                ...(value && value.name === item.name
                  ? [activeClass]
                  : []),
              ].join(" ")}
              itemId={`${instanceId}-${item.name}`}
              selected={value && item.name === value.name}
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
