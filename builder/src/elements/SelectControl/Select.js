import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import { config } from "react-spring";
import { Transition, animated } from "react-spring/renderprops";
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

const SelectControl = (props) => {
  const { options = _items, value = "item1", showLabel = false, label } = props;

  const [open, setOpen] = useState(false);
  const [openBackdrop, setBackdrop] = useState(false);
  const contentAnchorRef = useRef(null);
  const onItemClickHandler = (value) => (event) => {};

  const onChangeHandler = (event) => {};

  const onOpenHandler = (event) => {
    setBackdrop(true);
    setOpen(true);
  };

  const onDestroyedHandler = (status) => {
    if (status === true) {
      setTimeout(() => {
        setBackdrop(false);
      }, 100);
    }
  };

  const onCloseHandler = (event) => {
    setOpen(false);
  };

  let selectedItem = null;

  const items = options.map((option) => {
    const classes = classnames("editor-x-menu-item ", { "editor-x-menu-item-active": option.value === value });
    const item = (
      <div key={option.value} className={classes} onClick={onItemClickHandler(option)} data-value={option.value}>
        {option.label}
      </div>
    );
    if (option.value === value) {
      selectedItem = option;
      return React.cloneElement(item, {
        ref: (instance) => {
          contentAnchorRef.current = ReactDOM.findDOMNode(instance);
        },
      });
    }
    return item;
  });
  return (
    <div className="editor-x-select-control-wrapper">
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
      <SelectBackdrop open={openBackdrop} onClose={onCloseHandler}>
        <Transition
          items={open}
          onDestroyed={onDestroyedHandler}
          config={{ tension: 1000, friction: 50, mass: 3 }}
          from={(open) => {
            return {
              overflow: "hidden",
              transform: "translate3d(5px,0,0)",
              opacity: 0,
            };
          }}
          enter={(node) => {
            return {
              opacity: 1,
              transform: "translate3d(0,0,0)",
            };
          }}
          leave={{ opacity: 0, transform: "translate3d(5px,0,0)" }}
          trail={30}
        >
          {(isOpen) =>
            isOpen &&
            ((props) => (
              <animated.div className="editor-x-menu-list" style={{ ...props }}>
                {items}
              </animated.div>
            ))
          }
        </Transition>
      </SelectBackdrop>
    </div>
  );
};

export default SelectControl;
