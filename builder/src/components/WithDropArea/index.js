import React from "react";
import { withSelect, withDispatch } from "store";
import { compose } from "../compose";
import { createIndicator, removeIndicator } from "../../lib/addonHelper";

class WithDropArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHover: false,
      currentElement: null,
      counter: 0,
      hoverArea: null,
    };
    this.onMouseClick = this.onMouseClick.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
    // this.onMouseLeave = this.onMouseLeave.bind( this );
    this.onMouseMove = this.onMouseMove.bind(this);

    this.hoverArea = "";
    this.isAllow = false;
  }
  componentWillUnmount() {
    if (this.props.container) {
      this.toggleListeners(this.props.container, false);
    }
  }

  componentDidMount() {
    if (this.props.container) {
      this.toggleListeners(this.props.container);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.container === this.props.container) {
      return;
    }
    if (prevProps.container) {
      this.toggleListeners(prevProps.container, false);
    }
    if (this.props.container) {
      this.toggleListeners(this.props.container, true);
    }
  }

  toggleListeners(container, shouldListnerToEvents = true) {
    const method = shouldListnerToEvents
      ? "addEventListener"
      : "removeEventListener";
    container[method]("click", this.onMouseClick);
    container[method]("mouseover", this.onMouseOver.bind(this, container));
    container[method]("mouseout", this.onMouseOut.bind(this, container));
    container[method]("mousemove", this.onMouseMove);
    // container[ method ]( 'mouseleave', this.onMouseLeave );
  }

  onMouseClick(event) {
    let { pickedAddon, addonId, index, addon } = this.props;
    const { parentId } = addon;
    let _addonId = addonId;
    let _index = index;
    if (pickedAddon) {
      if (this.isAllow) {
        if (this.hoverArea === "top") {
          _addonId = parentId;
        } else if (this.hoverArea === "bottom") {
          _index = index + 1;
          _addonId = parentId;
        } else {
          // inside
          _index = 0;
        }
      } else {
        if (this.hoverArea === "top") {
          _index = index;
          _addonId = parentId;
          console.log("not allowed top", _index, _addonId, addon, pickedAddon);
        }
        if (this.hoverArea === "bottom") {
          _index = index + 1;
          _addonId = parentId;
          console.log(
            "not allowed bottom",
            _index,
            _addonId,
            addon,
            pickedAddon
          );
        }
      }
      let settings = {
        parentId: _addonId || "root",
        index: _index || 0,
        defaultAddon: {
          ...pickedAddon,
          attributes: {
            ...pickedAddon.attributes,
          },
        },
      };
      console.log("hey", settings);
      this.hoverArea = null;
      this.isAllow = false;
      this.props.onInsertAddon(settings);
    } else {
      // Select addon
      if (addonId) {
        this.props.selectAddon(addonId);
      }
    }
    removeIndicator();
  }

  onMouseOver(node, event) {
    event.stopPropagation();

    if (this.state.currentElement) return;

    if (!node.contains(event.target)) return;

    if (this.state.isHover || this.props.isSelected) {
      return;
    }

    // Check if all condition satisfied
    this.setState({ currentElement: node, isHover: true });
  }

  onMouseOut(node, event) {
    event.stopPropagation();
    //Ex: this.index = null
    if (!this.state.currentElement) return;

    if (this.state.currentElement)
      if (this.state.currentElement == node) {
        this.setState({ isHover: false, currentElement: null });
        return;
      }
  }

  isAllowed() {
    let {
      addon: { accept },
      pickedAddon: { name },
    } = this.props;
    if (!accept) return false;
    return accept === "*" || (Array.isArray(accept) && accept.includes(name));
  }

  onMouseMove(event) {
    const { isRTL, container, index, addonId, pickedAddon, addon } = this.props;

    if (!addonId || !pickedAddon) return;

    const hoverBoundingRect = container.getBoundingClientRect();

    const hoverMiddleY = hoverBoundingRect.top + hoverBoundingRect.height / 2;
    const hoverMiddleX = hoverBoundingRect.left + hoverBoundingRect.width / 2;
   
    let hoverArea = null;
    let isAllow = false;
    if (this.isAllowed()) {
      isAllow = true;
      if (
        event.clientY >= hoverBoundingRect.top - 5 &&
        event.clientY <= hoverBoundingRect.top + 5
      ) {
        hoverArea = "top";
      } else if (
        event.clientY >= hoverBoundingRect.bottom - 5 &&
        event.clientY <= hoverBoundingRect.bottom + 5
      ) {
        hoverArea = "bottom";
      } else {
        hoverArea = "inside";
      }
    } else {
      isAllow = false;
     
      // set top-bottom
      if (
        event.clientY <= hoverMiddleY &&
        event.clientY >= hoverBoundingRect.top
      ) {
        hoverArea = "top";
      }
      if (
        event.clientY > hoverMiddleY &&
        event.clientY <= hoverBoundingRect.bottom
      ) {
        hoverArea = "bottom";
      }
    }
    if (hoverArea !== this.hoverArea) {
      createIndicator(hoverBoundingRect, hoverArea);
      this.hoverArea = hoverArea;
    }
    if (isAllow !== this.isAllow) {
      this.isAllow = isAllow;
    }
  }

  render() {
    let { children, addon, index } = this.props;
    let { isHover } = this.state;
    return children({ isHover });
  }
}

export default compose(
  withSelect((select, { addonId = "root" }) => {
    let { getAddon, getPickedAddon } = select();

    return {
      addon: getAddon(addonId),
      pickedAddon: getPickedAddon(),
    };
  }),
  withDispatch((dispatch) => {
    const { insertAddon, selectAddon } = dispatch();

    return {
      onInsertAddon(settings) {
        insertAddon(settings);
      },
      selectAddon(addonId) {
        selectAddon(addonId);
      },
    };
  })
)(WithDropArea);
