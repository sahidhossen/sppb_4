import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import images from "./assets/images";
import { defaultPosition } from "./fixedPosition";
import { DraggableBox } from "../elements";

const PositionNumberControl = (props) => {
  const { name = "relative", style, onChange } = props;
  const { left, right, top, bottom } = style;
  //topLeft | topRight | bottomLeft | bottomRight | left | right | top | full
  const [positionPointer, setPositionPointer] = useState("topLeft");
  const [direction, setDirection] = useState("");
  const hasFixedPosition = name === "absolute" || name === "fixed";

  const setFixedPosition = (value) => (event) => {
    onChange(defaultPosition[value]);
    setPositionPointer(value);
  };

  const onClickHandler = (field) => (event) => {
    setDirection(field);
  };

  const onDragChangeHandler = (field) => (event, value) => {
    const fieldValue = style[field].value;
    if (fieldValue.unit === "") {
      fieldValue.unit = "px";
    }
    onChange({ [field]: { ...fieldValue, value } });
    if (field !== direction) {
      setDirection(field);
    }
  };

  return (
    <Fragment>
      <div className="editor-x-position-preview">
        <div className="editor-x-position-static"> {images[name]} </div>
      </div>
      {name !== "static" && (
        <div className="editor-x-position-wrapper">
          <DraggableBox
            className="editor-x-position-left"
            activeClass="editor-x-position-active"
            direction="VL"
            options={{
              isActive: direction === "left",
            }}
            onClick={onClickHandler("left")}
            onDragChange={onDragChangeHandler("left")}
            value={isNaN(left.value.value) ? 0 : left.value.value}
          />
          <DraggableBox
            className="editor-x-position-top"
            activeClass="editor-x-position-active"
            direction="HT"
            options={{
              isActive: direction === "top",
            }}
            onClick={onClickHandler("top")}
            onDragChange={onDragChangeHandler("top")}
            value={isNaN(top.value.value) ? 0 : top.value.value}
          />
          <DraggableBox
            className="editor-x-position-bottom"
            activeClass="editor-x-position-active"
            direction="HB"
            options={{
              isActive: direction === "bottom",
            }}
            onClick={onClickHandler("bottom")}
            onDragChange={onDragChangeHandler("bottom")}
            value={isNaN(bottom.value.value) ? 0 : bottom.value.value}
          />
          <DraggableBox
            className="editor-x-position-right"
            activeClass="editor-x-position-active"
            direction="VR"
            options={{
              isActive: direction === "right",
            }}
            onClick={onClickHandler("right")}
            onDragChange={onDragChangeHandler("right")}
            value={isNaN(right.value.value) ? 0 : right.value.value}
          />
          <div className="editor-x-position-corners">
            {hasFixedPosition && (
              <Fragment>
                <div className="editor-x-position-corner-one">
                  <span
                    className={`editor-x-position-corner-selector ${
                      positionPointer === "topLeft" && "editor-x-position-corner-active"
                    }`}
                    onClick={setFixedPosition("topLeft")}
                  ></span>
                  <span
                    className={`editor-x-position-corner-selector ${
                      positionPointer === "top" && "editor-x-position-corner-active"
                    }`}
                    onClick={setFixedPosition("top")}
                  ></span>
                  <span
                    className={`editor-x-position-corner-selector ${
                      positionPointer === "topRight" && "editor-x-position-corner-active"
                    }`}
                    onClick={setFixedPosition("topRight")}
                  ></span>
                </div>
                <div className="editor-x-position-corner-two">
                  <span
                    className={`editor-x-position-corner-selector ${
                      positionPointer === "left" && "editor-x-position-corner-active"
                    }`}
                    onClick={setFixedPosition("left")}
                  ></span>
                  <span
                    className={`editor-x-position-corner-selector ${
                      positionPointer === "full" && "editor-x-position-corner-active"
                    }`}
                    onClick={setFixedPosition("full")}
                  ></span>
                  <span
                    className={`editor-x-position-corner-selector ${
                      positionPointer === "right" && "editor-x-position-corner-active"
                    }`}
                    onClick={setFixedPosition("right")}
                  ></span>
                </div>
                <div className="editor-x-position-corner-three">
                  <span
                    className={`editor-x-position-corner-selector ${
                      positionPointer === "bottomLeft" && "editor-x-position-corner-active"
                    }`}
                    onClick={setFixedPosition("bottomLeft")}
                  ></span>
                  <span
                    className={`editor-x-position-corner-selector ${
                      positionPointer === "bottom" && "editor-x-position-corner-active"
                    }`}
                    onClick={setFixedPosition("bottom")}
                  ></span>
                  <span
                    className={`editor-x-position-corner-selector ${
                      positionPointer === "bottomRight" && "editor-x-position-corner-active"
                    }`}
                    onClick={setFixedPosition("bottomRight")}
                  ></span>
                </div>
              </Fragment>
            )}
          </div>
        </div>
      )}
    </Fragment>
  );
};

PositionNumberControl.propTypes = {
  style: PropTypes.object,
  name: PropTypes.string,
  onChange: PropTypes.func,
};

export default PositionNumberControl;
