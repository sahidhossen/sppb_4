
import React from 'react';

const GridItem = ({gridBoxSize, gridBoxGap}) => {
        return (
            <svg
              width="100%"
              height="100%"
              xmlns="http://www.w3.org/2000/svg"
              className="guides"
            >
              <defs>
                <pattern
                  id="grid-id-uskirv"
                  width={gridBoxSize + gridBoxGap}
                  height={gridBoxSize + gridBoxGap}
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    width={gridBoxSize}
                    height={gridBoxSize}
                    fill="#333333"
                    className="gridbox"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-id-uskirv)" />
            </svg>
          );
}

export default GridItem;