import { useState, useEffect } from "react";
import { findDOMNode } from "react-dom";

/**
 * @param {Element} elmRef The reference of the base grid
 * @return {array} [gridStartIndex, gridFinishIndex]
 * @return {{row: number, col: number}} gridStartIndex
 * @return {{row: number, col: number}} gridFinishIndex
 */

export default (elmRef) => {
  const [gridStartIndex, setGridStartIndex] = useState({});
  const [gridFinishIndex, setGridFinishIndex] = useState({});
  const [mousemove, setMouseMove] = useState(false);

  const getGridAxis = (event) => {
      if (elmRef === null ) {
          return;
      }
    let basegrid = findDOMNode(elmRef.current);
    // const basegrid = document.querySelector(".basegrid");
    
    if (!basegrid) return;

    const basegridRect = basegrid.getBoundingClientRect();

    const x = event.clientX - basegridRect.left;
    const y = event.clientY - basegridRect.top;

    const styles = window.getComputedStyle(basegrid);
    const gridWidth = +styles
      .getPropertyValue("grid-template-columns")
      .split(" ")[0]
      .replace("px", "");
    const gridGap = +styles
      .getPropertyValue("grid-gap")
      .split(" ")[0]
      .replace("px", "");

    const col = Math.floor(x / (gridWidth + gridGap)) + 1;
    const row = Math.floor(y / (gridWidth + gridGap)) + 1;

    if (event.type === "mousedown") {
      event.preventDefault();
      if (event.target === event.currentTarget) {
        setMouseMove(true);
        setGridStartIndex({ row, col });
        setGridFinishIndex({ row: 0, col: 0 });
      }
    }
    if (event.type === "mousemove") {
      setGridFinishIndex({ row, col });
    }
    if (event.type === "mouseup") {
      setMouseMove(false);
    }
  };

  useEffect(() => {
    if (mousemove) {
      console.log("mouse moving", mousemove);
      window.addEventListener("mousemove", getGridAxis);
    }
    if (!mousemove && elmRef !== null && elmRef.current) {
      let node = findDOMNode(elmRef.current);
      node.addEventListener("mousedown", getGridAxis);
    }
    return () => {
      window.removeEventListener("mousemove", getGridAxis);
    };
  }, [mousemove]);

  useEffect(() => {
    window.addEventListener("mouseup", getGridAxis);
    return () => {
      window.removeEventListener("mouseup", getGridAxis);
    };
  });
  return [gridStartIndex, gridFinishIndex];
};
