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
    // const { connectDragSource, connectDropTarget } = this.props;
    // const node = findDOMNode(instance);
    // if (node) {
    //   // connectDragSource(connectDropTarget(node));
    // }
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
])(AddonListAddon);
