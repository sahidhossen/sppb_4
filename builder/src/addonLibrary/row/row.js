import React from "react";
import classNames from "classnames/bind";

class Row extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { addonId } = this.props;
    const clsNames = classNames("sppb-4", "sppb-row", addonId);
    // console.log("row props: ", this.props);
    return (
      <div className={clsNames}> {this.props.renderChildren()} </div>
    );
  }
}

export default Row;
