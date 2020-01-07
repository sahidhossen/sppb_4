import React, {Fragment} from 'react';
import { connect } from 'react-redux';
import { DragSource, DropTarget } from 'react-dnd';
import DragDropContext from './lib/DragDropContext';
import {getBlockById} from './lib/utils';
import { Types } from './actions/dragType';

class Builder extends React.Component {
  render() {
    const { 
        state,
        connectDropTarget, 
        isOver, 
        isDragging, 
     } = this.props
    const { data } = state
    const { builder } = data.present
    // console.log("block: ", builder)
    return (connectDropTarget(
      <div className="sppb-builder-wrapper">
          { builder.root.childrens.length > 0 ?
            builder.root.childrens.map( (blockId, index) => {
              const block = getBlockById(builder, blockId)
              const { Component } = block
              return (
                <Fragment key={index}>
                  <Component
                    index={index}
                    block={block}
                    builder={builder}
                  />
                  <div className="drag-pointer">&nbsp;</div>
                </Fragment>
              )
            }) 
          : 
          <div className="empty-block"> <p> Please add addon here </p>  </div>
          }
      </div>
    ));
  }
}

const mapStateToProps = ( state ) => {
  return {
    state
  };
}

const mapDispatchToProps = ( dispatch ) => {
  return {
    addBlock: (payload) => {
      /**
       * payload: { parentIndex, block }
       */
      dispatch({type:'ADD_BLOCK', payload })
    }
  }
}

const BuilderDragTarget = {
  canDrop( props, monitor ){
    // console.log("allowd", props, monitor.getItem())
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
    const dropData = monitor.getItem()
    console.log("section drop: ", dropData)
    // console.log(dropData)
    props.addBlock({
      parentIndex: 0, //props.index,
      parentId: 'root',
      blockName: dropData.name
    })
    return;
  }
}

function collect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDropTarget: connect.dropTarget(),
    // You can ask the monitor about the current drag state:
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType(),
  }
}


var DropTargetDecorator = DropTarget(Types.BLOCK, BuilderDragTarget, collect);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DragDropContext(DropTargetDecorator(Builder)));