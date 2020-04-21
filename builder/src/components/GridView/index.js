import React, { Fragment } from "react";
import { getGridDimention, SelectPlaceHolder, getGridArea } from "./gridHelper";
import GridItem from "./GridItem";
import { withSelect, withDispatch } from "store";
import { compose } from "../compose";

/**
 * Calculate select grid items
 * When drop add addon on selected grid-layout
 */

class GridView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      GridSelectStart: { row: 0, col: 0 },
      GridSelectEnd: { row: 0, col: 0 },
      isMouseMove: false,
    };
  }
  componentDidMount() {
    if (this.props.container) {
      this.toggleListeners(this.props.container);
    }
  }

  componentWillUnmount() {
    if (this.props.container) {
      this.toggleListeners(this.props.container, false);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.container === this.props.container) {
      return;
    }
    if (prevProps.container) {
      this.toggleListeners(prevProps.container, false);
    }
    if (this.props.container) {
      this.toggleListeners(this.props.container, true);
    }
  }

  toggleListeners(node, shouldListnerToEvents = true) {
    const method = shouldListnerToEvents
      ? "addEventListener"
      : "removeEventListener";
    node[method]("mousedown", this.gridAxis.bind(this));
    node[method]("mouseup", this.gridAxis.bind(this));
    window.frames["sppb-editor-view"].window[method](
      "mousemove",
      this.gridAxis.bind(this)
    );
  }

  gridAxis(event) {
    let { isMouseMove } = this.state;

    if (!isMouseMove && event.type === "mousedown") {
      event.preventDefault();
      if (event.target === event.currentTarget) {
        this.setState({
          isMouseMove: true,
          GridSelectStart: { ...this.getGridAxis(event) },
          GridSelectEnd: { row: 0, col: 0 },
        });
      }
    }

    if (this.state.isMouseMove && event.type === "mousemove") {
      this.setState({ GridSelectEnd: { ...this.getGridAxis(event) } });
    }
    if (isMouseMove && event.type === "mouseup") {
      this.setState({ isMouseMove: false });
    }
  }

    render(){    
        
        let {GridSelectStart, GridSelectEnd} = this.state;
        let {addonId, addon, mediaQuery, pickedAddon} = this.props;
        console.log("picked: ", pickedAddon)
        let { attributes: {
                _addonWidth,
                gridGap,
                gridCol
            } } = addon
        let gridWidth = '';
        
        if (addonId) {
            // Any addon 
            gridWidth = _addonWidth;
        } else {
            // Root
            gridWidth = mediaQuery.value;
        }
        const gridItemAttributes = {
            gridWidth: gridWidth,
            gridGap: gridGap,
            gridCol: gridCol,
          };


        const gridArea = getGridArea(GridSelectStart, GridSelectEnd);
        const gridDimention = getGridDimention(gridItemAttributes);
        return (
            <Fragment>
                <GridItem {...gridDimention}/>
                {GridSelectStart.col > 0 && GridSelectEnd.col > 0 
                ?
                    <SelectPlaceHolder gridArea={gridArea} />
                : 
                    <div className="sppb-empty-grid-placeholder"></div>}

                {this.props.children}
            </Fragment>
        )
  }
}

export default compose(
    withSelect( (select, {addonId='root'}) => {
        let { getActiveMediaQuery, getAddon, getPickedAddon } = select();
        return {
            mediaQuery: getActiveMediaQuery(),
            addon: getAddon(addonId),
            pickedAddon: getPickedAddon()
        }
    })
)(GridView);
