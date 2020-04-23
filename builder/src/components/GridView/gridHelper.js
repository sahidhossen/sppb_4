import React from "react";

/**
 *
 * @param {string} str
 * @return {number}
 */

export const getNum = (str) => {
  let num = str.replace(/[^0-9]/g, "");
  return parseInt(num, 10);
};

/**
 *
 * @param {{row: number, col: number}} gridStartIndex
 * @param {{row: number, col: number}} gridFinishIndex
 * @return {string}
 */

export const getGridArea = (gridStartIndex, gridFinishIndex) => {
  let rowStart, rowEnd, colStart, colEnd;
  const { row: gridStartRow, col: gridStartCol } = gridStartIndex;
  const { row: gridFinishRow, col: gridFinishCol } = gridFinishIndex;

  // set column for right to left dragging
  if (gridStartCol > gridFinishCol) {
    colStart = gridFinishCol;
    colEnd = gridStartCol;
  } else {
    // set column for left to right dragging
    colStart = gridStartCol;
    colEnd = gridFinishCol;
  }

  //set row for bottom to top dragging
  if (gridStartRow > gridFinishRow) {
    rowStart = gridFinishRow;
    rowEnd = gridStartRow;
  } else {
    // set row for top to bottom dragging
    rowStart = gridStartRow;
    rowEnd = gridFinishRow;
  }
  return `${rowStart} / ${colStart} / ${rowEnd + 1} / ${colEnd + 1}`;
};

/**
 *
 * @param {object} param
 * @param {string} param.gridWidth The width of the entire gridBox with unit
 * @param {string} param.gridGap The gap between each grid with unit
 * @param {number} param.gridCol The number of columns of the grid
 * @return {Object}
 */
export const getGridDimention = ({ gridWidth, gridGap, gridCol }) => {
  const gridBoxWidth = isNaN(gridWidth) ? getNum(gridWidth) : gridWidth;
  const gridBoxGap = getNum(gridGap);
  const gridBoxSize = parseFloat(
    (gridBoxWidth - (gridCol - 1) * gridBoxGap) / gridCol
  );
  return { gridBoxSize, gridBoxGap };
};

/**
 *
 * @param {{className: string, gridArea: string}} param
 * @return {Element}
 */

export const SelectPlaceHolder = ({ className = "placeholder", gridArea }) => {
  return (
    <div className={className} style={{ gridArea: gridArea }}>
      <span className="sppb-placeholder-text">{gridArea}</span>
    </div>
  );
};

/**
 *
 * @param {object} param
 * @param {Element} param.container The container which holds the addon
 * @param {object} param.addon Addon Data
 * @param {{row: number, col: number}} param.GridSelectStart
 * @param {{row: number, col: number}} param.GridSelectEnd
 * @return {{height: number, width: number}} Returns value in pixel (px)
 */

export const getGridHeightWidth = ({
  container,
  addon,
  GridSelectStart,
  GridSelectEnd,
}) => {
  const {
    attributes: { gridGap, gridCol },
  } = addon;
  const totalRow = Math.abs(GridSelectEnd.row - GridSelectStart.row) + 1;
  const totalCol = Math.abs(GridSelectEnd.col - GridSelectStart.col) + 1;

  const containerRect = container.getBoundingClientRect();
  const gridWidth = containerRect.width;

  const { gridBoxSize } = getGridDimention({ gridWidth, gridGap, gridCol });
  const gridBoxGap = getNum(gridGap);

  const width = gridBoxSize * totalCol + (totalCol - 1) * gridBoxGap;
  const height = gridBoxSize * totalRow + (totalRow - 1) * gridBoxGap;

  return {
    width: { value: width, unit: "px" },
    height: { value: height, unit: "px" },
  };
};
