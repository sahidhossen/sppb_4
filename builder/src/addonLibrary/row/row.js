import React from "react";
import classNames from "classnames/bind";

class Row extends React.Component {
  constructor(props) {
    super(props);
  }

  static templateSet() {
    return [
      { name: "column", attributes: { border: "1px solid red" } },
      { name: "column", attributes: { border: "1px solid green" } },
    ];
  }

  render() {
    const { addonId, attributes, viewport } = this.props;
    // let { gridGap, gridCol, gridArea, _addonWidth } = attributes;
    const clsNames = classNames(addonId, 'sppb-row');

    // let _gridArea = gridArea.split("/");

    // let rowS = _gridArea[0];
    // let colS = _gridArea[1];
    // let rowE = _gridArea[2];
    // let colE = _gridArea[3];

    // let w = colE - colS;
    // let h = rowE - rowS;
    // // console.log("grid area: ", w, h, viewport)

    // // if(viewport.value === 768) {
    // //   gridCol = _addonWidth - 100;
    // //   console.log("tablet found")
    // // }
    // // if (viewport.value === 320) {
    // //   gridCol = _addonWidth - 150;
    // // }

    // let style = {
    //   // gridArea,
    //   gridTemplateColumns: `repeat(${gridCol}, minmax(calc((${_addonWidth}px + ${gridGap})/${gridCol} - ${gridGap}),1fr))`,
    //   gridAutoRows: `calc((${_addonWidth}px + ${gridGap})/${gridCol} - ${gridGap})`,
    //   gridGap: gridGap,
    //   // gridColumn: `${colS}/${w+1}`,
    //   // gridRow: `${rowS}/${h+1}`,
    //   gridArea,
    //   "--w": w,
    //   "--h": h,
    //   "--x": colS,
    //   "--y": rowS,
    // };
    console.log("chedk: row")
    return (
      <div className={clsNames}>
        {this.props.renderChildren()}
      </div>
    );
  }
}

export default Row;
