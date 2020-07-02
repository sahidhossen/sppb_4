import React, { useState, useRef, useEffect, useReducer } from "react";
import ReactDOM from "react-dom";
import { config, useSpring, animated } from "react-spring";
import { Transition } from "react-spring/renderprops";
import classnames from "classnames";
import SelectBackdrop from "./SelectBackdrop";

const fieldStyle = {
  left: 0,
  width: "100%",
  bottom: 0,
  opacity: 0,
  position: "absolute",
  pointerEvents: "none",
};

const _items = [
  { value: "item1", label: "Item 1" },
  { value: "item2", label: "Item 2" },
  { value: "item3", label: "Item 3" },
  { value: "item4", label: "Item 4" },
  { value: "item5", label: "Item 5" },
  { value: "item6", label: "Item 6" },
  { value: "item7", label: "Item 7" },
  { value: "item8", label: "Item 8" },
  { value: "item9", label: "Item 9" },
];

const style = { top: 0 };

const getTopLeft = (wrapperNode) => {
  const rect = wrapperNode.getBoundingClientRect();
  return {
    top: rect.top + rect.height,
    left: rect.left,
  };
};

const SelectControl = (props) => {
  const { options = _items, value = "item3", showLabel = false, label } = props;

  const [open, setOpen] = useState(false);
  const [openBackdrop, setBackdrop] = useState(false);
  const wrapperNode = useRef(null);
  const contentAnchorRef = useRef(null);

  const onItemClickHandler = (value) => (event) => {};

  const onChangeHandler = (event) => {};

  const [springProps, set, stop] = useSpring(() => {
    return {
      opacity: 0,
      height: 0,
      top: 0,
      config: { tension: 2000, friction: 150, mass: 3 },
    };
  });

  const setWrapperNode = (node) => {
    if (node) {
      wrapperNode.current = node;
      let coord = getTopLeft(node);
      set({ top: coord.top, left: coord.left });
    }
  };

  const setActiveItemRef = (status, index) => (node) => {
    if (status && node) {
      contentAnchorRef.current = node;
      let position = getTopLeft(wrapperNode.current);
      let itemCoord = node.getBoundingClientRect();
      const itemTop = itemCoord.top + itemCoord.height - position.top;
      set({ top: position.top - itemTop, opacity: 1 });
    }
  };

  const onOpenHandler = (event) => {
    setBackdrop(true);
    setOpen(true);
    set({ opacity: 0.5, height: "auto" });
  };

  const onCloseHandler = (event) => {
    let position = getTopLeft(wrapperNode.current);
    set({ opacity: 0, top: position.top });
    setTimeout(() => {
      setOpen(false);
    }, 1000);
  };

  useEffect(() => {
    console.log("changed", contentAnchorRef);
  }, [wrapperNode.current]);

  let selectedItem = null;

  const items = options.map((option, index) => {
    const classes = classnames("editor-x-menu-item ", { "editor-x-menu-item-active": option.value === value });
    if (option.value === value) {
      selectedItem = option;
    }
    return (
      <div
        key={option.value}
        ref={setActiveItemRef(option.value === value, index + 1)}
        className={classes}
        onClick={onItemClickHandler(option)}
        data-value={option.value}
      >
        {option.label}
      </div>
    );
  });

  return (
    <div className="editor-x-select-control-wrapper" ref={setWrapperNode}>
      {showLabel && <label>{label}</label>}
      <div className="editor-x-select-control">
        <div className="editor-x-selected-name" onClick={onOpenHandler}>
          {selectedItem !== null && selectedItem.label}
        </div>
        <input
          type="text"
          aria-hidden={true}
          onChange={onChangeHandler}
          className="editor-x-select-value-field"
          value={value}
          style={fieldStyle}
        />
      </div>
      <SelectBackdrop open={open} onClose={onCloseHandler}>
        <animated.div className="editor-x-menu-list" style={{ ...springProps }}>
          {items}
        </animated.div>
      </SelectBackdrop>
    </div>
  );
};

export default SelectControl;
