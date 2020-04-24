import React from 'react';
import classNames from 'classnames/bind';

class Heading extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        const { setAttributes, addonId, attributes} = this.props
        let {
            gridArea
        } = attributes

        let _gridArea = gridArea.split('/');

        let rowS = _gridArea[0];
        let colS = _gridArea[1];
        let rowE = _gridArea[2];
        let colE = _gridArea[3];
    
        let w = colE - colS;
        let h = rowE - rowS;

        
        let style = {
            backgroundColor:'rgba(0,0,0,0.2)',
            justifyContent: 'center',
            alignItems: 'center',
            display:"grid",
            // gridColumn: `span ${w}`,
            // gridColumnStart: `${colS}`,
            // gridColumnEnd: `${colE}`,
            // gridRowStart: `${rowS}`,
            // gridRowEnd: `${rowS}`,
            '--w': w,
            '--h': h,
            '--x': colS,
            '--y': rowS,
            gridArea
        }
        console.log("header: ", this.props)
        const clsNames = classNames('sppb-4' ,'sppb-heading', addonId)
        return( <h1 style={style} className={clsNames} onClick={()=> setAttributes({src: 'http://google.com'})}>Heading</h1>)
    }
}

export default Heading;