import React from "react";
import classNames from "classnames/bind";

class Row extends React.Component {
  constructor(props) {
    super(props);
  }

  static templateSet() {
    return [
      { name: 'column', attributes: {border: '1px solid red'} },
      { name: 'column', attributes: {border: '1px solid green'} }
    ]
  }

  render() {
    const { addonId, attributes } = this.props;
    let {
      gridGap,
      gridCol, 
      gridArea,
      _addonWidth
    } = attributes
    const clsNames = classNames(addonId, 'basegrid');    

    let _gridArea = gridArea.split('/');

    let rowS = _gridArea[0];
    let colS = _gridArea[1];
    let rowE = _gridArea[2];
    let colE = _gridArea[3];

    let w = colE - colS;
    let h = rowE - rowS;
    console.log("grid area: ", w, h)

    let style = {
      // gridArea,
      gridTemplateColumns: `repeat(${gridCol}, minmax(calc((${_addonWidth}px + ${gridGap})/${gridCol} - ${gridGap}),1fr))`,
      gridAutoRows: `calc((${_addonWidth}px + ${gridGap})/${gridCol} - ${gridGap})`,
      gridGap: gridGap, 
      '--w': w,
      '--h': h,
      '--x': colS,
      '--y': rowS
  };

    return (
      <div style={style} className={clsNames}> 
        <span className="sppb-row-tag">Row</span>
        {this.props.renderChildren()} 
      </div>
    );
  }
}

export default Row;
