import React from "react";
import { SPPBStore } from "../../SPPBStore";
import classNames from "classnames/bind";

class Row extends React.Component {
  constructor(props) {
    super(props);
  }

 

  render() {
    const clsNames = classNames("sppb-4", "sppb-row");
    return (
      <div className={clsNames}> {this.props.renderChildren()}</div>
    );
  }
}

export default SPPBStore(Row);
