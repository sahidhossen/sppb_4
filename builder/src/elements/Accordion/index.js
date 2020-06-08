import React, { Component } from "react";
import PropTypes from "prop-types";

export class Accordion extends Component {
  static propTypes = {
    allowMultipleOpen: PropTypes.bool,
    children: PropTypes.instanceOf(Object).isRequired,
  };

  constructor(props) {
    super(props);
    const openSections = {};
    React.Children.toArray(this.props.children).forEach(
      ({ props: { label, isOpen } } = child) =>
        isOpen && (openSections[label] = true)
    );

    this.state = {
      openSections,
    };

    this.onClick = this.onClick.bind(this);
  }

  onClick(label) {
    const {
      state: { openSections },
      props: { allowMultipleOpen },
    } = this;

    const isOpen = !!openSections[label];

    if (allowMultipleOpen) {
      this.setState({
        openSections: {
          ...openSections,
          [label]: !isOpen,
        },
      });
    } else {
      this.setState({
        openSections: {
          [label]: !isOpen,
        },
      });
    }
  }

  render() {
    const {
      onClick,
      props: { children },
      state: { openSections },
    } = this;
    const childrenWithProps = React.Children.toArray(children).map((child) =>
      React.cloneElement(child, {
        isOpen: !!openSections[child.props.label],
        onClick: onClick,
        key: child.props.label,
      })
    );
    return (
      <div className="editor-x-form-controllers editor-x-accordion">{childrenWithProps}</div>
    );
  }
}

export default Accordion;
