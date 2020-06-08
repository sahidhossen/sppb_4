import React, { Component } from "react";
import PropTypes from "prop-types";

export class AccordionSection extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.instanceOf(Object),
      PropTypes.string,
    ]).isRequired,
    onClick: PropTypes.func,
    icon: PropTypes.string,
  };

  static defaultProps = {
    isOpen: false,
    label: "label",
    icon: "fas fa-angle-right",
  };

  onClick() {
    this.props.onClick(this.props.label);
  }

  render() {
    const {
      onClick,
      props: { isOpen, label, icon, children },
    } = this;
    return (
      <div
        className="editor-x-accordion-item"
      >
        <div onClick={onClick.bind(this)} className={`editor-x-accordion-head${isOpen ? ' editor-x-accordion-opened' : ''}`}>
          {label}
          <span className={icon}></span>
        </div>
        {isOpen && (
          <div className="editor-x-accordion-content">
            {children}
          </div>
        )}
      </div>
    );
  }
}

export default AccordionSection;
