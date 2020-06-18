import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import images from "./assets/images";
import { defaultPosition } from "./fixedPosition";

const PositionNumberControl = (props) => {
  const { name = "relative", style, onChange } = props;
  //topLeft | topRight | bottomLeft | bottomRight | left | right | top | full
  const [positionPointer, setPositionPointer] = useState("topLeft");
  const hasFixedPosition = name === "absolute" || name === "fixed";

  const setFixedPosition = (value) => (event) => {
    onChange(defaultPosition[value]);
    setPositionPointer(value);
  };

  return (
    <Fragment>
      <div className="editor-x-position-preview">
        <div className="editor-x-position-static"> {images[name]} </div>;
      </div>
      {name !== "static" && (
        <div className="editor-x-position-wrapper">
          <div className="editor-x-position-left"></div>
          <div className="editor-x-position-top editor-x-position-active"></div>
          <div className="editor-x-position-bottom"></div>
          <div className="editor-x-position-right"></div>
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
