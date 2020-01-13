import React from "react";
import { SPPBStore } from "../../SPPBStore";
import classNames from "classnames/bind";

class Row extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const clsNames = classNames("sppb-4", "sppb-row");
    // console.log("row: ", this.props.getChildAddons());
    const childAddons = this.props.getChildAddons();
    this.props.block.content = childAddons;
    console.log("inside row", this.props);
    return (
      <div className={clsNames}>
        {this.props.block.content.map((ChildAddon, index) => (
          <ChildAddon key={index} {...this.props} />
        ))}
      </div>
    );
  }
}

export default SPPBStore(Row);
