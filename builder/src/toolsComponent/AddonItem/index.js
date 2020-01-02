import React, { Component } from "react";
import { connect } from "react-redux";
import { testIframe } from "../../actions";
import { DragSource } from "react-dnd";
import { Types } from "../../actions/dragType";

const BlockSource = {
  beginDrag(props) {
    console.log("begin: ", props);
    return {
      type: Types.BLOCK,
      name: props.block.name,
      block: props.block
    };
  },
  endDrag(props, monitor, component) {
    console.log("end: ", props);
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
  return {
    testIframe: () => {
      dispatch(testIframe());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DragSourceDecorator(AddonItem));
