import React, { Component } from "react";
import { connect } from "react-redux";
import { DragSource } from "react-dnd";
import { Types } from "../../actions/dragType";

const BlockSource = {
  beginDrag(props) {
    console.log("begin drop");
    /**
     * Create an portal to move with mouse position
     * Attach portal element with props
     */

    return {
      type: Types.BLOCK,
      name: props.block.name,
      block: props.block
    };
  },
  endDrag(props, monitor, component) {
    const dropResult = monitor.getDropResult()
    /**
     * Get portal element from getResult
     * Remove portal element from document
     */
    if (typeof dropResult.element !== 'undefined') {
      dropResult.element.classList.remove('center-placeholder');
      dropResult.element.classList.remove('top-placeholder');
      dropResult.element.classList.remove('bottom-placeholder');
    }
    // console.log("end drop", dropResult);
  }
};

const blockCollector = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  };
};

class AddonItem extends Component {
  constructor(props) {
    super();
    this.state = {
      enable_tools: false
    };
  }
  render() {
    const {
      block,
      connectDragPreview,
      connectDragSource,
      isDragging
    } = this.props;
    return connectDragPreview(
      connectDragSource(
        <div className="sppb-tool-inner">
          <div className="sppb-tool-icon">
            {" "}
            <span className={block.icon}></span>
          </div>
          <div className="sppb-tool-name"> {block.title} </div>
        </div>
      )
    );
  }
}

var DragSourceDecorator = DragSource(Types.BLOCK, BlockSource, blockCollector);

const mapStateToProps = state => {
  return {
    state
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DragSourceDecorator(AddonItem));
