import React, { Component } from "react";
import { createHigherOrderComponent } from "../components/compose";

/**
 * @param {Element} WrappedComponent The disposable component.
 *
 * @return {Component} Component with the focus restauration behaviour.
 */
export default createHigherOrderComponent((WrappedComponent) => {
  return class extends Component {
    constructor() {
      super(...arguments);

      this.setIsFocusedTrue = () => (this.isFocused = true);
      this.setIsFocusedFalse = () => (this.isFocused = false);
      this.activeElementOnMount = document.activeElement;
    }

    componentWillUnmount() {
      const { activeElementOnMount, isFocused } = this;
      if (!activeElementOnMount) {
        return;
      }

      const { body, activeElement } = document;
      if (isFocused || null === activeElement || body === activeElement) {
        activeElementOnMount.focus();
      }
    }

    render() {
      return (
        <div className="withfocus" onFocus={this.setIsFocusedTrue} onBlur={this.setIsFocusedFalse}>
          <WrappedComponent {...this.props} />
        </div>
      );
    }
  };
}, "withFocusComponent");
