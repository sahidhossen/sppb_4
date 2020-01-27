import React from "react";
import { connect } from "react-redux";
import { DragSource, DropTarget } from "react-dnd";
import { findDOMNode } from "react-dom";
import _ from 'lodash';
import { getChildAddons, renderChildAddons } from "../lib/addonHelper";
import { Types } from "../actions/dragType";
import { setAttribute, addAddon, transferAddon } from "../actions";
import { dispatch, select } from "store";

const StoreHoc = PureComponent => {
  class HOC extends React.Component {
    constructor(props) {
      super(props);
      
    }

    shouldComponentUpdate(nextProps, nextState) {
      // console.log("next: ",nextProps.builder, nextProps.pastData )
      // let {addonId, builder} = nextProps; 
      // let {pastData} = this.props
      // const nextBlock = builder[addonId]; 
      // const {name} = nextProps.block;
      // const prevBlock = typeof pastData[addonId] === 'undefined' ? null : pastData[addonId]; 
      // if (prevBlock === null){
      //   console.log("block: ", pastData)
      // }
      // if (name === 'Heading') {
      //   console.log("block: ", prevBlock)
      // }
      // if (!_.isEqual(nextBlock, prevBlock) && name === 'column') {
      //   console.log("column: ", prevBlock, nextBlock)
      // }
      // console.log("prev-1: "+name, _.isEqual(nextBlock, prevBlock))
      // if (prevBlock!==null) { 
      //   if (!_.isEqual(nextBlock.attributes, prevBlock.attributes)) { 
      //     console.log("prev-2: "+name, nextBlock.attributes, prevBlock.attributes)
      //   }
      //   if (!_.isEqual(nextBlock.childrens, prevBlock.childrens)) { 
      //     console.log("prev-3: "+name, nextBlock.childrens, prevBlock.childrens )
      //   }

      //   if (!_.isEqual(nextBlock.content, prevBlock.content)) { 
      //     console.log("prev-4: "+name, nextBlock.content, prevBlock.content )
      //   }
      // }

      // prevBlock === null &&
      // _.isEqual(nextProps.block.attributes, this.props.block.attributes) &&
      // _.isEqual(nextProps.block.childrens, this.props.block.childrens) &&
      // _.isEqual(nextProps.block.content, this.props.block.content)

      // if (
      //   _.isEqual(nextBlock, prevBlock) &&
      //   _.isEqual(nextBlock.attributes, prevBlock.attributes) &&
      //   _.isEqual(nextBlock.childrens, prevBlock.childrens) &&
      //   _.isEqual(nextBlock.content, prevBlock.content)
      //   ) {
      //   return false;
      // }
      // return true;
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

    render() {
      // console.log("render pure", this.props.block.name)
      return <PureComponent ref={this.renderDnD.bind(this)} {...this.props} />;
    }
  }
  const mapStateToProps = state => {
    const { data: {present, past, history:{history}} } = state;
    const {builder} = present;
    // let {past} = history;
    let pastData = typeof past[past.length-1] === 'undefined' ? null : Object.assign({},past[past.length-1].builder);
    console.log("past: ", past[past.length-1])
    // if (pastData !== null) {
    //   pastData = pastData.builder;
    // }
    
    return { builder, pastData };
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

  const ElementDragSource = {
    beginDrag(props) {
      return {
        addonId: props.addonId,
        index: props.index,
        name: props.block.name,
        onPage: true
      };
    },
    endDrag(props, monitor, component) {
      console.log("End drop from element")
    }
  };

  const ElementDragTarget = {
    canDrop(props, monitor) {
      return true;
    },
    hover(props, monitor, component) {
      const { block: { droppable,name } } = props;
      const item = monitor.getItem();

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

      if (item.name === name) {
        return;
      }

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
      const {builder, block:{name}} = props;
      const dropData = monitor.getItem(); // Droppable data from source

      element.classList.remove('center-placeholder');
      element.classList.remove('top-placeholder');
      element.classList.remove('bottom-placeholder');

      
      if (hasDroppedOnChild || dropData.name === name) {
        // Recive return option on endDrag hook
        console.log("not allowed")
        return {move: false, element};
      }
      
      const { hoverOpt } = monitor;

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
      if (typeof dropData.onPage && dropData.onPage === true) {
        // Drag inside page
        actionData.addonId = dropData.addonId;
        dispatch(transferAddon(actionData))
      } else { 
        // Add new addon on page
        dispatch(addAddon(actionData));
      }

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
