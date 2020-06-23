import React from "react";
import classNames from "classnames/bind";

class Column extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onMouseOver: false,
    };
  }

  render() {
    let { className, addonId, renderChildren } = this.props;
    const clsNames = classNames("sppb-4", addonId, className);
    const style = { flex: 1, borderWidth: 1, borderStyle: "solid", borderColor: "blue" };
    return (
      <div data-id={addonId} className={clsNames} style={style}>
        {renderChildren()}
      </div>
    );
  }
}

export default Column;
