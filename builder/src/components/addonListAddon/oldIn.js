import React from "react";
import { findDOMNode } from "react-dom";
import { DragSource, DropTarget } from "react-dnd";
import { withSelect, withDispatch } from "store";
import { Types } from "../../actions/dragType";
import { compose } from "../compose";
import AddonEdit from "../AddonEdit";
import withChildren from "../childAddon";
import { createIndicator, removeIndicator } from "../../lib/addonHelper";

class AddonListAddon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.setAttributes = this.setAttributes.bind(this);
    this.ref = React.createRef();
  }

  setAttributes(attributes) {
    const { addonId, onChange } = this.props;
    onChange(addonId, attributes);
  }

  renderDnd(instance) {
    const { connectDragSource, connectDropTarget } = this.props;
    const node = findDOMNode(instance);
    if (node) {
      // connectDragSource(connectDropTarget(node));
    }
  }

  withChildren(settings = {}) {
    return withChildren({...settings, ref: this.ref, index: this.props.index });
  }

  render() {
    const { addonId, addon, index } = this.props;
    return (
      <AddonEdit
        ref={this.ref}
        refs={this.renderDnd.bind(this)}
        name={addon.name}
        index={index}
        isSelected={false}
        addonId={addonId}
        attributes={addon.attributes}
        setAttributes={this.setAttributes}
        renderChildren={this.withChildren.bind(this)}
      />
    );
  }
}

const ElementDragSource = {
  beginDrag(props) {
    return {
      addonId: props.addonId,
      index: props.index,
      name: props.addon.name,
      onPage: true
    };
  },
  endDrag(props, monitor, component) {
    console.log("End drop from element");
  }
};

const ElementDragTarget = {
  canDrop(props, monitor) {
    return true;
  },
  hover(props, monitor, component) {
    const {
      addon: { droppable, name, accept },
      index
    } = props;
    const item = monitor.getItem();
    // const portal = findDOMNode(item.portal);

    const element = findDOMNode(component);

    const hoverBoundingRect = element.getBoundingClientRect();
    const hoverMiddleY = hoverBoundingRect.top + hoverBoundingRect.height / 2;

    const clientOffset = monitor.getClientOffset();
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    const position = {
      inside: false,
      top: false,
      bottom: false,
      index
    };

    if (monitor.didDrop()) {
      return monitor.position;
    }

    const isAcceptable =
      accept === "*" ||
      (Array.isArray(accept) && accept.includes(dropData.name));
    if (isAcceptable) {
      if (
        clientOffset.y >= hoverBoundingRect.top - 5 &&
        clientOffset.y <= hoverBoundingRect.top + 5
      ) {
        position.top = true;
        position.index = index;
      } else if (
        clientOffset.y >= hoverBoundingRect.bottom - 5 &&
        clientOffset.y <= hoverBoundingRect.bottom + 5
      ) {
        position.bottom = true;
        position.index = index + 1;
      } else {
        position.inside = true;
        position.index = 0;
      }

      let dis = 0;
      if (element.hasChildNodes()) {
        const childNodes = element.childNodes;
        const hoveredItemPositionFromTop = hoverBoundingRect.top;
        for (let i = 0; i < childNodes.length; i++) {
          let childHeight = 0;
          if (childNodes[i].nodeType !== 3) {
            childHeight = childNodes[i].getBoundingClientRect().height;
          } else {
            // For text nodes
            const range = document.createRange();
            range.selectNode(childNodes[i]);
            childHeight = range.getBoundingClientRect();
            range.detach();
          }
          dis += childHeight + hoveredItemPositionFromTop;
          if (dis > clientOffset.y) {
            position.index = i;
            console.log("<<<<<>>>>>> ", childNodes[i]);
            break;
          }
        }
      }
    } else {
      if (
        clientOffset.y <= hoverMiddleY &&
        clientOffset.y >= hoverBoundingRect.top
      ) {
        position.top = true;
      }
      if (
        clientOffset.y > hoverMiddleY &&
        clientOffset.y <= hoverBoundingRect.bottom
      ) {
        position.bottom = true;
        position.index = index + 1;
      }
    }

    createIndicator(hoverBoundingRect, position);
    console.log("lst position: ", position, isAcceptable, index, name);
    monitor.position = position;
    return;
  },
  /**
   *
   * @param {Object} props Current element props
   * @param {Object} monitor monitor object from DnD
   * @param {*} component Droppable component from drag-source
   */
  drop(props, monitor, component) {
    const dropData = monitor.getItem(); // Droppable data from source
    const { position } = monitor;
    removeIndicator();
    const element = findDOMNode(component);

    const hasDroppedOnChild = monitor.didDrop();
    const {
      addon: { name, accept },
      parentId,
      addonId,
      onInsertAddon,
      onMoveAddon,
      getDefaultAddon
    } = props;

    // denied if has child dropped element
    if (hasDroppedOnChild) {
      return { move: false, element };
    }

    const actionData = {
      parentId: parentId || "root",
      addonId,
      index: position.index,
      addonName: dropData.name
    };

    if (position.top) {
      /**
       * If drop to the top position then place the addon to top of the current addon
       *
       * @addonId = @parentId collect current addons parentId and set to addonId
       * @index             current addon index and decrease 1 for put one step up
       * @defaultAddon      Collect dropped defaultAddon data for page render
       * @dispatch()        Dispatch the data for redux store update
       */
      //   actionData.index = index - 1;
    }

    if (position.inside === true && accept) {
      /**
       * If drop inside an addon then place it inside the current addon
       *
       * Check if this current addons accept params
       * Check if accept params hold the dropped addon name
       *
       * @addonId             Current addonId
       * @index               set current to zero (0)
       * @defaultAddon        Collect dropped defaultAddon data for page render
       * @dispatch()          Dispatch the data for redux store update
       */
      const isAcceptable =
        accept === "*" ||
        (Array.isArray(accept) && accept.includes(dropData.name));
      if (!isAcceptable) {
        console.log("Not acceptable");
        return { move: false, element };
      }
      if (isAcceptable && dropData.name === name) {
        console.log("Not acceptable");
        return { move: false, element };
      }
      actionData.parentId = addonId;
      //   actionData.index = 0;
    }
    console.log("position: ", position);
    if (dropData.onPage && dropData.onPage === true) {
      // Move addon target to destination
      actionData.addonId = dropData.addonId;
      console.log("move: ", actionData);
      onMoveAddon(actionData);
    } else {
      // Add new addon to the page
      console.log("action: ", actionData);
      actionData.defaultAddon = getDefaultAddon(dropData.name);
      onInsertAddon(actionData);
    }

    //   let index = dropData.index;
    //   console.log("position: ", position)
    //   if (position.inside) {
    //     index = 0;
    //   } else if (position.top) {
    //     index = index - 1;
    //   }

    //   const actionData = {
    //     parentId: position.inside ? addonId : parentId || 'root',
    //     index: index,
    //     addonName: dropData.name
    //   };
    //   if (typeof dropData.onPage !== 'undefined' && dropData.onPage === true) {
    //     // Drag inside page
    //     actionData.addonId = dropData.addonId;
    //     onMoveAddon(actionData)
    //   } else {
    //     // Add new addon on page
    //     actionData.defaultAddon = getDefaultAddon(dropData.name)
    //     onInsertAddon(actionData);
    //   }

    // Recive return option on endDrag hook
    return { move: true, element };
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

const _AddonListAddon = DropTargetDecorator(
  DragSourceDecorator(AddonListAddon)
);
export default compose([
  withSelect((select, ownProps) => {
    const { getAddon, getDefaultAddon } = select();
    const { addonId } = ownProps;
    const addon = getAddon(addonId);
    return {
      addon,
      getDefaultAddon
    };
  }),
  withDispatch(dispatch => {
    const { updateAddonAttributes, moveAddon, insertAddon } = dispatch();
    return {
      onChange(addonId, attributes) {
        updateAddonAttributes(addonId, attributes);
      },
      onMoveAddon(settings) {
        moveAddon(settings);
      },
      onInsertAddon(settings) {
        insertAddon(settings);
      }
    };
  })
])(_AddonListAddon);
