import React from "react";
import { findDOMNode } from "react-dom";
import classNames from "classnames/bind";
import ComponentPortal from "../../helpers/ComponentPortal";

function getHoverStyle(node) {
  if (node) {
    const nodeRect = node.getBoundingClientRect();
    return {
      width: `${nodeRect.width}px`,
      height: `${nodeRect.height}px`,
      position: "absolute",
      top: "0px",
      left: "0px",
      transform: `translate(${nodeRect.left + 240}px, ${nodeRect.top + 75}px)`,
      border: "1px solid green",
      backgroundColor: "none",
      pointerEvents: "none",
    };
  }
}

export default class AddonOutline extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      style: {},
    };
  }

  componentDidMount() {
    const container = findDOMNode(this.props.container.current);
    const style = getHoverStyle(container);
    this.setState((state) => ({ ...state, style }));
    window.frames["sppb-editor-view"].window.addEventListener(
      "scroll",
      this.getStyle.bind(this)
    );
  }

  componentWillUnmount() {
    window.frames["sppb-editor-view"].document.removeEventListener(
      "scroll",
      this.getStyle.bind(this)
    );
  }

  getStyle() {
    const style = getHoverStyle(findDOMNode(this.props.container.current));
    this.setState((state) => ({ ...state, style }));
  }

  render() {
    let { className } = this.props;
    const styles = this.state.style;
    const _class = classNames("sppb-addon-outline", className);

    return (
      <ComponentPortal>
        <div className={_class} style={styles}>
          {this.props.children}
        </div>
      </ComponentPortal>
    );
  }
}
