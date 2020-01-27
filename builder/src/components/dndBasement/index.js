import React from 'react';
import { DropTarget } from "react-dnd";
import {withSelect, withDispatch} from 'store';
import {compose} from '../compose';
import { Types } from "../../actions/dragType";

class DnDBasement extends React.Component {
    render(){
        const {connectDropTarget} = this.props;
        return (connectDropTarget( 
            <div className="sppb-dnd-basement">
                <h3 className="title">Drop something here</h3>
            </div>
        ))
    }
}

const BuilderDragTarget = {
    canDrop(props, monitor) {
    //   console.log("allowd", props)
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
      props.insertAddon({
        index: props.index, //,
        parentId: props.addonId || 'root',
        addonName: dropData.name,
        defaultAddon: props.getDefaultAddon(dropData.name)
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


export default compose([
    withSelect( (select, ownProps ) => {
        const {getDefaultAddon, getChildrenIds} = select();
        const {addonId} = ownProps
        const index = getChildrenIds(addonId).length+1;
        return {
            index,
            addonId,
            getDefaultAddon
        }
    }),
    withDispatch( dispatch => {
        const {insertAddon} = dispatch(); 
        return {
            insertAddon
        }
    })
  ])(DropTargetDecorator(DnDBasement));