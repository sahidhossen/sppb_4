import React, { Fragment } from "react";
import { findDOMNode } from "react-dom";
import { DragSource, DropTarget } from "react-dnd";
import { withSelect, withDispatch } from "store";
import { Types } from "../../actions/dragType";
import { compose } from "../compose";
import AddonEdit from "../AddonEdit";
import withChildren from "../childAddon";
import AddonOutline from "./AddonOutline";
import { createIndicator, removeIndicator } from "../../lib/addonHelper";

class AddonListAddon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
      addonId: null,
      selectedAddonId: null,
      instance: null,
      currentElement: null,
      style: {},
    };
    this.ref = React.createRef();
    this.setAttributes = this.setAttributes.bind(this);
    this.renderDnd = this.renderDnd.bind(this);
  }

  componentDidMount() {
    this.toggleListeners(this.node);
  }

  componentWillUnmount() {
    if (this.node) {
      this.toggleListeners(this.node, false);
    }
  }

  toggleListeners(node, shouldListnerToEvents = true) {
    const method = shouldListnerToEvents
      ? "addEventListener"
      : "removeEventListener";
    node[method]("mouseover", this.onMouseOver.bind(this, node));
    node[method]("mouseout", this.onMouseOut.bind(this, node));
    node[method]("click", this.selectAddon.bind(this));
  }

  setAttributes(attributes) {
    const { addonId, onChange } = this.props;
    onChange(addonId, attributes);
  }

  onMouseOver(node, event) {
    event.stopPropagation();

    if (this.state.currentElement) return;

    if (!node.contains(event.target)) return;

    if (this.state.hover || this.props.isSelected) {
      return;
    }

    this.setState({ currentElement: node, hover: true });
  }

  onMouseOut(node, event) {
    event.stopPropagation();
    if (!this.state.currentElement) return;

    if (this.state.currentElement)
      if (this.state.currentElement == node) {
        this.setState({ hover: false, currentElement: null });
        return;
      }
  }

  getAddonRefs(instance) {
    const node = findDOMNode(instance);
    this.node = node;
  }

  selectAddon(event) {
    event.stopPropagation();
    this.props.selectAddon(this.props.addonId);
  }

  withChildren(settings = {}) {
    return withChildren(settings);
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
    return withChildren({
      ...settings,
      ref: this.wrapperNode,
      index: this.props.index,
    });
  }

  render() {
    const { addonId, addon, index, isSelected } = this.props;
    let { hover } = this.state;
    return (
      <Fragment>
        <AddonEdit
          ref={this.ref}
          refs={this.getAddonRefs.bind(this)}
          name={addon.name}
          index={index}
          addon={addon}
          addonId={addonId}
          attributes={addon.attributes}
          isSelected={isSelected}
          setAttributes={this.setAttributes}
          renderChildren={this.withChildren.bind(this)}
        />
        {!isSelected && hover && (
          <AddonOutline
            addonId={addonId}
            container={this.ref}
            type="onHover"
            className="sppb-hover-wrapper"
          />
        )}
        {isSelected && (
          <AddonOutline
            addonId={addonId}
            container={this.ref}
            type="onSelect"
            addon={addon}
            className="sppb-selected-wrapper"
          />
        )}
      </Fragment>
    );
  }
}

export default compose([
  withSelect((select, { addonId }) => {
    const { getAddon, getDefaultAddon, selectedAddonId } = select();
    const addon = getAddon(addonId);
    const selectedId = selectedAddonId();
    return {
      addon,
      defaultAddon: getDefaultAddon(addon.name),
      isSelected: selectedId === addonId,
    };
  }),
  withDispatch((dispatch) => {
    const {
      updateAddonAttributes,
      moveAddon,
      insertAddon,
      selectAddon,
    } = dispatch();
    return {
      onChange(addonId, attributes) {
        updateAddonAttributes(addonId, attributes);
      },
      onMoveAddon(settings) {
        moveAddon(settings);
      },
      onInsertAddon(settings) {
        insertAddon(settings);
      },
      selectAddon(addonId) {
        selectAddon(addonId);
      },
    };
  }),
])(AddonListAddon);
