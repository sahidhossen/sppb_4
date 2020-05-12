import React from "react";
import ReactDom from "react-dom";
import classNames from "classnames/bind";

export default class SppbPortal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement("div");
  }
  componentDidMount() {
    this.el.className = classNames("sppb-portal", this.props.className);
    document.body.appendChild(this.el);
  }
  componentWillUnmount() {
    document.body.removeChild(this.el);
  }
  render() {
    return ReactDom.createPortal(this.props.children, this.el);
  }
}
