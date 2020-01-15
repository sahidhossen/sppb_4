import React from 'react';
import classNames from 'classnames/bind';

class Heading extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        const { block, getAttribute, setAttribute } = this.props
        const clsNames = classNames('sppb-4' ,'sppb-heading', block.id)
        console.log("header props: ", this.props)
        return( <h1 className={clsNames} onClick={()=> setAttribute('src', 'http://google.com')}>Heading</h1>)
    }
}

export default Heading;