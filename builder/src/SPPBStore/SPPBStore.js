import React from "react";
import { connect } from "react-redux";
import { DragSource, DropTarget } from "react-dnd";
import { findDOMNode } from "react-dom";
import { getChildAddons, renderChildAddons } from "../lib/addonHelper";
import { Types } from "../actions/dragType";
import { setAttribute, addAddon } from "../actions";
import { dispatch } from "store";

const StoreHoc = PureComponent => {
  class HOC extends React.Component {
    constructor(props) {
      super(props);
    }

    renderDnD(instance) {
      const { connectDragSource, connectDropTarget, block } = this.props;
      const node = findDOMNode(instance);
      connectDragSource(node);
      connectDropTarget(node);
      // if (typeof block.droppable !== 'undefined' && block.droppable === true) {
      //     connectDropTarget(node);
      // }
    }

    componentDidUpdate(prevProps) {

    }

    render() {
      
      return <PureComponent ref={this.renderDnD.bind(this)} {...this.props} />;
    }
  }
  const mapStateToProps = state => {
    const { data } = state;
    const {
      present: { builder }
    } = data;
    return {
      builder
    };
  };

  const ElementDragSource = {
    beginDrag(props) {
      return {
        id: props.id,
        index: props.index,
        demo: "wow"
      };
    }
  };

  const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      getChildAddons: () => getChildAddons(ownProps.addonId),
      renderChildren: () => renderChildAddons(ownProps),
      hasChildrens: () => ownProps.block.childrens.length,
      getAttribute: name => {
        name = name.toLowerCase();
        const {
          block: { attributes }
        } = ownProps;
        return attributes[name] ? attributes[name] : null;
      },
      setAttribute: (name, value) => {
        name = name.toLowerCase();
        const payload = {
          id: ownProps.block.id,
          attr: { [name]: value }
        };
        dispatch(setAttribute(payload));
      }
    };
  };

  const ElementDragTarget = {
    canDrop(props, monitor) {
      return true;
    },
    hover(props, monitor, component) {
      const item = monitor.getItem();

      const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
      const hoverMiddleY = hoverBoundingRect.top + hoverBoundingRect.height / 2;

      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      const canDrop = monitor.canDrop()
      // console.log("onHover: ", props.block.name, " dragItem: ", item.name, ' candrop: ', canDrop);
      const hoverOpt = {center: false, top: false, bottom: false, index: props.index}

      /**
       * Check if the position (itemHeight-)
       */

      if (
        clientOffset.y > hoverBoundingRect.top &&
        clientOffset.y < hoverMiddleY
      ) {
        // console.log(`${props.block.name} top`);
        /**
         * Need to find target parent addon
         * Get the childrens and find the index number targeted addon Id
         * Decrement 1 for add the source addon before the target addon
         */
        hoverOpt.top = true;
        hoverOpt.bottom = false;
      } else {
        /**
         * Need to find target parent addon
         * Get the childrens and find the index number targeted addon Id
         */
        hoverOpt.top = false;
        hoverOpt.bottom = true;
        // console.log(`${props.block.name} bottom`);
      }
      monitor.hoverOpt = hoverOpt;
      return;
    },
    /**
     *
     * @param {Object} props Current element props
     * @param {Object} monitor monitor object from DnD
     * @param {*} component Droppable component from drag-source
     */
    drop(props, monitor, component) {
      /**
       * @params parentIndex
       * @params blockName: block
       */
      const hasDroppedOnChild = monitor.didDrop();
      if (hasDroppedOnChild)
        return;

      const dropData = monitor.getItem(); // Droppable data from source
      const { block } = dropData;
      const {
        builder,
        block: { droppable }
      } = props;

      // console.log("drop into element: ", dropData, props);
      const baseAddon = builder[props.addonId];
      // console.log("base: ", props, dropData);

      const actionData = {
        parentId: props.addonId,
        index: props.index,
        blockName: dropData.name
      };

      dispatch(addAddon(actionData));
      return;
    }
  };
  var DragSourceDecorator = DragSource(Types.BLOCK, ElementDragSource, function(
    connect,
    monitor
  ) {
    return {
      connectDragSource: connect.dragSource(),
      connectDragPreview: connect.dragPreview(),
      isDragging: monitor.isDragging()
    };
  });

  var DropTargetDecorator = DropTarget(Types.BLOCK, ElementDragTarget, function(
    connect,
    monitor
  ) {
    return {
      connectDropTarget: connect.dropTarget(),
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      isOverCurrent: monitor.isOver({ shallow: true })
    };
  });

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(DropTargetDecorator(DragSourceDecorator(HOC)));
};

export default StoreHoc;
