import React, { Component } from "react";
import { connect } from "react-redux";
import { DragSource } from "react-dnd";
import { compose } from "../../../compose";
import { withSelect, withDispatch } from "store";
import { Types } from "../../../../actions/dragType";

const BlockSource = {
  beginDrag(props) {
    /**
     * Create an portal to move with mouse position
     * Attach portal element with props
     */

    return {
      type: Types.BLOCK,
      name: props.block.name,
      block: props.block,
    };
  },
  endDrag(props, monitor, component) {
    const dropResult = monitor.getDropResult();
  },
};

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
    const {
      block,
      connectDragPreview,
      connectDragSource,
      isDragging,
    } = this.props;
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

var DragSourceDecorator = DragSource(Types.BLOCK, BlockSource, blockCollector);

const mapStateToProps = (state) => {
  return {
    state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(DragSourceDecorator(AddonItem));

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
