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

    state = {
      errorMsg: ''
    }

    render() {
      const {isOverCurrent} = this.props
      console.log("isCurrent: ", isOverCurrent)
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
      const { block: { droppable } } = props;

      const element = findDOMNode(component);
      
      const hoverBoundingRect = element.getBoundingClientRect();
      const hoverMiddleY = hoverBoundingRect.top + hoverBoundingRect.height / 2;

      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      const hoverOpt = {
        inside: false,
        top: false,
        bottom: false
      };

      /**
       * Check if the position (itemHeight-)
       */
      if (droppable) {
        if (clientOffset.y <= hoverBoundingRect.top + 5) {
          hoverOpt.top = true;
          element.classList.remove('bottom-placeholder');
          element.classList.remove('center-placeholder');
          element.classList.add('top-placeholder');
        } else if (clientOffset.y >= hoverBoundingRect.bottom - 5) {
          hoverOpt.bottom = true;
          element.classList.add('bottom-placeholder');
          element.classList.remove('top-placeholder');
          element.classList.remove('center-placeholder');
        } else {
          hoverOpt.inside = true;
          element.classList.add('center-placeholder');
          element.classList.remove('top-placeholder');
          element.classList.remove('bottom-placeholder');
        }
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
      
      const element = findDOMNode(component);
      const hasDroppedOnChild = monitor.didDrop();
      element.classList.remove('center-placeholder');
      element.classList.remove('top-placeholder');
      element.classList.remove('bottom-placeholder');

      const dropData = monitor.getItem(); // Droppable data from source

      if (hasDroppedOnChild) {
        // Recive return option on endDrag hook
        return {move: false, element};
      }

      
      const { hoverOpt } = monitor;
      const {builder} = props;

      const baseAddon = builder[props.addonId];
      let addonId = baseAddon.parentId;
      let index = dropData.index;

      if (hoverOpt.inside) {
        index = 0;
        addonId = props.addonId;
      } else if (hoverOpt.top) {
        index = index - 1;
      }
      const actionData = {
        parentId: addonId,
        index: index,
        blockName: dropData.name
      };

      dispatch(addAddon(actionData));

      // Recive return option on endDrag hook
      return {move: true, element};
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
