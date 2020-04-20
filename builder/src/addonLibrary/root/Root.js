import React, {Fragment} from 'react';
import { connect } from "react-redux";
import {isEqual} from 'lodash';
import { DragSource, DropTarget } from "react-dnd";
import { getBlockById } from "../../lib/utils";
import { insertAddon } from "../../actions";
import { Types } from "../../actions/dragType";

class Root extends React.Component {
  shouldComponentUpdate(nextProps, nextState){
    // console.log("change: ", nextProps.block.childrens, this.props.block.childrens)
    if (isEqual(nextProps.block.childrens, this.props.block.childrens)) {
      // return false;
    }
    return true;
  }
  render(){
      const {block, connectDropTarget, isOver} = this.props
      // console.log("render: ")
      return (
          block.childrens.length > 0 ? (
          block.childrens.map((blockId, index) => {
            const childBlock = getBlockById(blockId);
            const { Component, name } = childBlock;
            const activeClass = isOver ? 'active' : ''
              return (
                  <Fragment key={index}>
                      <Component index={index} block={childBlock} addonId={blockId} />
                  </Fragment>
              )
          })

        ) : (
          connectDropTarget(<div className="empty-block">
            {" "}
            <p> Please add addon here </p>{" "}
          </div> )
        )
      )
  }
}


const mapStateToProps = state => {
    return {};
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      addBlock: payload => dispatch(insertAddon(payload))
    };
  };
  
  const BuilderDragTarget = {
    canDrop(props, monitor) {
      // console.log("allowd", props)
      // if (props.addonId)
      return true;
    },
    hover(props, monitor, component) {
      // console.log("section hover: ")
      return;
    },
    drop(props, monitor, component) {
      /**
       * @params parentIndex
       * @params blockName: block
       */
      const hasDroppedOnChild = monitor.didDrop();
      if (hasDroppedOnChild){
        return;
      }
      const dropData = monitor.getItem();
      props.addBlock({
        parentIndex: 0, //,
        parentId: props.addonId,
        blockName: dropData.name
      });
      return;
    }
  };
  
  function collect(connect, monitor) {
    return {
      // Call this function inside render()
      // to let React DnD handle the drag events:
      connectDropTarget: connect.dropTarget(),
      // You can ask the monitor about the current drag state:
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop(),
      itemType: monitor.getItemType()
    };
  }
  
  const DropTargetDecorator = DropTarget(Types.BLOCK, BuilderDragTarget, collect);

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(DropTargetDecorator(Root));
  