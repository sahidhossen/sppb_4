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
import { getNum, getGridArea } from "../GridView/gridHelper";

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
      isMouseMove: false,
      dragStartData: {},
      dragEndIndex: {},
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
    this.toggleListeners(window.frames["sppb-editor-view"].document, false);
  }

  toggleListeners(node, shouldListnerToEvents = true) {
    const method = shouldListnerToEvents
      ? "addEventListener"
      : "removeEventListener";

    node[method]("mouseover", this.onMouseOver.bind(this, node));
    node[method]("mouseout", this.onMouseOut.bind(this, node));
    node[method]("click", this.selectAddon.bind(this));

    // drag
    node[method]("mousedown", this.onMouseDown.bind(this, node));
    node[method]("mousemove", this.onMouseMove.bind(this, node));
    node[method]("mouseup", this.onMouseUp.bind(this, node));
  }

  setAttributes(attributes) {
    const { addonId, onChange } = this.props;
    onChange(addonId, attributes);
  }

  onMouseDown(node, event) {
    event.preventDefault();

    let { isMouseMove } = this.state;
    const {
      addon: {
        attributes: { gridArea },
      },
      isAddonPicked,
    } = this.props;

    if (isAddonPicked) return;

    if (!isMouseMove) {
      if (event.target === event.currentTarget) {
        this.setState({
          isMouseMove: true,
          dragStartData: gridArea,
        });
      }
    }

    window.frames["sppb-editor-view"].document.addEventListener(
      "mousemove",
      this.onMouseMove.bind(this)
    );
    window.frames["sppb-editor-view"].document.addEventListener(
      "mouseup",
      this.onMouseUp.bind(this)
    );
  }
  onMouseMove(event) {
    if (this.state.isMouseMove) {
      this.setState({ dragEndIndex: { ...this.getGridAxis(event) } });
    }
  }

  onMouseUp(event) {
    this.setState({ isMouseMove: false });
    this.toggleListeners(window.frames["sppb-editor-view"].document, false);
    this.setGridArea();
  }

  setGridArea() {
    const { addonId, onChange } = this.props;
    const { dragStartData, dragEndIndex: gridStartIndex } = this.state;
    const gridTemplateSplit = dragStartData.split("/");
    const totalRow = Math.abs(gridTemplateSplit[2] - gridTemplateSplit[0] - 1);
    const totalCol = Math.abs(gridTemplateSplit[3] - gridTemplateSplit[1] - 1);

    const gridEndIndex = {
      row: gridStartIndex.row + totalRow,
      col: gridStartIndex.col + totalCol,
    };

    const newGridArea = getGridArea(gridStartIndex, gridEndIndex);

    onChange(addonId, { gridArea: newGridArea });
    console.log("update: ",newGridArea);
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
  getGridAxis(event) {
    const {
      addon: {
        attributes: { gridArea, _addonWidth, container },
      },
      parentAddon: {
        attributes: { gridGap },
      },
    } = this.props;

    if (!container) {
      return;
    }
    let basegrid = container;
    const basegridRect = basegrid.getBoundingClientRect();

    const x = event.clientX - basegridRect.left;
    const y = event.clientY - basegridRect.top;

    const gridAreaSplit = gridArea.split("/");
    const colStart = gridAreaSplit[1];
    const colEnd = gridAreaSplit[3];
    const totalCol = Math.abs(colEnd - colStart);

    const gridItemGap = getNum(gridGap);
    const gridWidth = (_addonWidth - (totalCol - 1) * gridItemGap) / totalCol;

    const col = Math.floor(x / (gridWidth + gridItemGap)) + 1;
    const row = Math.floor(y / (gridWidth + gridItemGap)) + 1;

    return { row, col };
  }

  getAddonRefs(instance) {
    const node = findDOMNode(instance);
    this.node = node;
  }

  selectAddon(event) {
    event.stopPropagation();
    this.props.selectAddon(this.props.addonId);
  }

  renderDnd(instance) {
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
    const { addonId, addon, viewport, index, isSelected } = this.props;
    let { hover } = this.state;
    // console.log("wrapper: ", this.wrapperNode)
    return (
      <Fragment>
        {!isSelected && hover && (
          <AddonOutline
            addonId={addonId}
            container={this.wrapperNode}
            type="onHover"
            className="sppb-hover-wrapper"
          />
        )}
        {isSelected && (
          <AddonOutline
            addonId={addonId}
            container={this.wrapperNode}
            type="onSelect"
            addon={addon}
            className="sppb-selected-wrapper"
          />
        )}
        <AddonEdit
          ref={this.renderDnd}
          refs={this.getAddonRefs.bind(this)}
          name={addon.name}
          viewport={viewport}
          index={index}
          addon={addon}
          addonId={addonId}
          attributes={addon.attributes}
          isSelected={isSelected}
          setAttributes={this.setAttributes}
          renderChildren={this.withChildren.bind(this)}
        />
        
      </Fragment>
    );
  }
}

export default compose([
  withSelect((select, { addonId }) => {
    const {
      getAddon,
      getDefaultAddon,
      selectedAddonId,
      isAddonPicked,
      getActiveMediaQuery
    } = select();
    const addon = getAddon(addonId);
    const parentAddon = getAddon(addon.parentId);
    const selectedId = selectedAddonId();
    
    return {
      addon,
      defaultAddon: getDefaultAddon(addon.name),
      isSelected: selectedId === addonId,
      parentAddon,
      isAddonPicked: isAddonPicked(),
      viewport: getActiveMediaQuery(),
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
