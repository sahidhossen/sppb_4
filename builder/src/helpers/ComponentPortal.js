import React from "react";
import ReactDom from "react-dom";
import classNames from "classnames/bind";

export default class ComponentPortal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement("div");
  }
  componentDidMount() {
    let nextNodeId = new Date().getTime();
    this.el.className = classNames(
      "sppb-portal",
      this.props.className,
      `sp-pagebuilder-portal-${nextNodeId}`
    );
    // this.el.className = `sp-pagebuilder-portal-${nextNodeId}`;
    document.body.appendChild(this.el);
  }
  componentWillUnmount() {
    document.body.removeChild(this.el);
  }
  render() {
    return ReactDom.createPortal(this.props.children, this.el);
  }
}
