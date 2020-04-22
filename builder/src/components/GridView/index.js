import React, { Fragment} from 'react';
import {getGridDimention, SelectPlaceHolder, getGridArea, getNum} from './gridHelper';
import GridItem from './GridItem';
import {withSelect, withDispatch} from 'store';
import {compose} from '../compose';

/**
 * Calculate select grid items
 * When drop add addon on selected grid-layout
 */

class GridView extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            GridSelectStart: {row: 0, col: 0},
            GridSelectEnd: {row: 0, col: 0},
            isMouseMove: false
        }
    }
    componentDidMount(){        
        if ( this.props.container ) {
			this.toggleListeners( this.props.container );
		}
    }

    componentWillUnmount() {
        if ( this.props.container ) {
			this.toggleListeners( this.props.container, false );
		}
    }

    componentDidUpdate(prevProps) {
        if ( prevProps.container === this.props.container ) {
			return;
        }
		if ( prevProps.container ) {
			this.toggleListeners( prevProps.container, false );
		}
		if ( this.props.container ) {
			this.toggleListeners( this.props.container, true );
		}
    }

    toggleListeners(node, shouldListnerToEvents = true) {
        const method = shouldListnerToEvents
        ? "addEventListener"
        : "removeEventListener";
      node[method]("mousedown", this.gridAxis.bind(this));
      node[method]("mouseup", this.gridAxis.bind(this));
      window.frames["sppb-editor-view"].window[method]("mousemove", this.gridAxis.bind(this));
    }

    gridAxis(event) {
        let {isMouseMove} = this.state; 

        if (!this.props.pickedAddon) {
            return;
        }
        
        if (!isMouseMove && event.type === "mousedown") {
            
            event.preventDefault();
            if (event.target === event.currentTarget) {
                this.setState({
                    isMouseMove: true, 
                    GridSelectStart: {...this.getGridAxis(event)}, 
                    GridSelectEnd:{ row:0, col:0}
                })
            }
        }
        
        if (this.state.isMouseMove && event.type === "mousemove") {
            this.setState({ GridSelectEnd: {...this.getGridAxis(event)} })
        }
        if (isMouseMove && event.type === "mouseup") {
            this.setState({ isMouseMove: false})
            this.onInsertAddon();
        }
    }

    getGridAxis(event) {
        const {container} = this.props;
        if (!container) {
            return;
        }
        let basegrid = container;

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

        return {row, col}
    }

    onInsertAddon() {
        let {pickedAddon, addonId, addon:{attributes:{gridGap, gridCol}}, mediaQuery, index} = this.props;
        let {GridSelectStart, GridSelectEnd} = this.state;

        let gridArea = getGridArea(GridSelectStart, GridSelectEnd);

        let w = (GridSelectEnd.col - GridSelectStart.col) + 1;
        let h = (GridSelectEnd.row - GridSelectStart.row) + 1;
        let gap = getNum(gridGap);
        let width = mediaQuery.value;

        let cell = (width/gridCol) - gap

        let _height = (cell * h) + ((h-1)*gap)
        let _width = (cell * w) + ((w-1)*gap)

        let settings = {
            parentId: addonId || 'root',
            index,
            defaultAddon: {...pickedAddon, attributes:{ ...pickedAddon.attributes, gridArea }}
        }
        this.setState({GridSelectEnd:{ row:0, col:0}, GridSelectStart:{ row:0, col:0}})
        this.props.onInsertAddon(settings);
    }

    render(){    
        
        let {GridSelectStart, GridSelectEnd} = this.state;
        let {addonId, addon, mediaQuery, pickedAddon} = this.props;

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
                {GridSelectStart.col > 0 && GridSelectEnd.col &&
                    <SelectPlaceHolder gridArea={gridArea} />
                }

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
    }), 
    withDispatch( (dispatch)=> {
        const {insertAddon} = dispatch(); 

        return {
            onInsertAddon(settings) {
                insertAddon(settings);
            }
        }
    })
)(GridView);


// // grid-row-start: 1; y
// // grid-row-end: 3; w

// // grid-column-start: 4; x
// // grid-column-end: 7;

// --x: 4;
// --y: 1;
// --w: 3;
// --h: 2;


// // grid-row-start: 1;
// // grid-row-end: 4;
// // grid-column-start: 3;
// // grid-column-end: 10;

// --x: 3;
// --y: 1;
// --w: 7;
// --h: 3;