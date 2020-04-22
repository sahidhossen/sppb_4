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
        let style = {
            backgroundColor:'rgba(0,0,0,0.2)',
            justifyContent: 'center',
            display:"grid",
            gridArea
        }
        // console.log("header: ", this.props)
        const clsNames = classNames('sppb-4' ,'sppb-heading', addonId)
    return( <h1 style={style} className={clsNames} onClick={()=> setAttributes({src: 'http://google.com'})}>Heading</h1>)
    }
}

export default Heading;