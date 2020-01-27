import React from 'react';
import classNames from 'classnames/bind';

class Heading extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        const { setAttributes, addonId } = this.props
        // console.log("header: ", this.props)
        const clsNames = classNames('sppb-4' ,'sppb-heading', addonId)
    return( <h1 className={clsNames} onClick={()=> setAttributes({src: 'http://google.com'})}>Heading</h1>)
    }
}

export default Heading;