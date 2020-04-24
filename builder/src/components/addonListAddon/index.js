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
    // this.ref = React.createRef();
    this.renderDnd = this.renderDnd.bind(this);
  }

  setAttributes(attributes) {
    const { addonId, onChange } = this.props;
    onChange(addonId, attributes);
  }

  renderDnd(instance) {
    // const { connectDragSource, connectDropTarget } = this.props;
    // const node = findDOMNode(instance);
    // if (node) {
    //   // connectDragSource(connectDropTarget(node));
    // }
    this.wrapperNode = findDOMNode(instance);

    this.forceUpdate();
  }

  withChildren(settings = {}) {
    return withChildren({...settings, ref: this.wrapperNode, index: this.props.index });
  }

  render() {
    const { addonId, addon, viewport, index } = this.props;
    return (
      <AddonEdit
        ref={this.renderDnd}
        // refs={this.renderDnd}
        name={addon.name}
        index={index}
        isSelected={false}
        addonId={addonId}
        viewport={viewport}
        attributes={addon.attributes}
        setAttributes={this.setAttributes}
        renderChildren={this.withChildren.bind(this)}
      />
    );
  }
}

export default compose([
  withSelect((select, ownProps) => {
    const { getAddon, getActiveMediaQuery } = select();
    const { addonId } = ownProps;
    const addon = getAddon(addonId);
    return {
      addon,
      viewport: getActiveMediaQuery()
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
])(AddonListAddon);
