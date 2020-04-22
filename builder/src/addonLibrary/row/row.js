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
      gridArea
    } = attributes
    const clsNames = classNames("sppb-4", "sppb-row", addonId, 'basegrid');
    console.log("row props: ", this.props);
    let style = {
      "--gg": gridGap,
      "--gc": gridCol,
      gridArea: gridArea
    }

    return (
      <div style={style} className={clsNames}> {this.props.renderChildren()} </div>
    );
  }
}

export default Row;
