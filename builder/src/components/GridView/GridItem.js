
import React from 'react';

const GridItem = ({gridBoxSize, gridBoxGap, addonId}) => {
      let gridId = `sppb-grid-${addonId || 'root'}`;
        return (
            <svg
              width="100%"
              height="100%"
              xmlns="http://www.w3.org/2000/svg"
              className="guides"
            >
              <defs>
                <pattern
                  id={gridId}
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
              <rect width="100%" height="100%" fill={`url(#${gridId})`} />
            </svg>
          );
}

export default GridItem;