import React, { Fragment} from 'react';
import {GridItem, SelectPlaceHolder, getGridArea} from './gridHelper';

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


    render(){    
        
        let {GridSelectStart, GridSelectEnd} = this.state;
        
        const attributes = {
            gridWidth: "900px",
            gridGap: "10px",
            gridCol: 20,
          };  
          console.log("girdL ", GridSelectStart)
        return (
        <Fragment>
            
            <GridItem {...attributes}/>

            {GridSelectStart.col > 0 && GridSelectEnd.col > 0 
            ?
                <SelectPlaceHolder gridArea={getGridArea(GridSelectStart, GridSelectEnd)} />
            : 
                <div className="sppb-empty-grid-placeholder"></div>}

            {this.props.children}
        </Fragment>
        )
    }
}

export default GridView;