import React, { Component } from "react";
import { compose } from "../../../compose";
import { withDispatch } from "store";

const blockCollector = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  };
};

class AddonItem extends Component {
  constructor(props) {
    super();
    this.state = {
      enable_tools: false,
    };
  }
  onAddonPicked() {
    const { toggleDropdown } = this.props;
    this.props.addonPicked();
    toggleDropdown();
  }
  render() {
    const { block } = this.props;
    return (
      <div
        className="sppb-addon-list-item"
        onClick={this.onAddonPicked.bind(this)}
      >
        <div className="sppb-tool-icon">
          {" "}
          <span className={block.icon}></span>
        </div>
        <div className="sppb-addon-list-item-title"> {block.title} </div>
      </div>
    );
  }
}

export default compose(
  withDispatch((dispatch, { block }) => {
    let { pickAddon } = dispatch();
    return {
      addonPicked() {
        pickAddon(block.name);
      },
    };
  })
)(AddonItem);
