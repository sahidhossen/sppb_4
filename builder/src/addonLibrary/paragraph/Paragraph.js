import React from 'react';
import classNames from 'classnames/bind';

class Paragraph extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        // console.log("Paragraph props",this.props)
        const clsNames = classNames('sppb-4' ,'sppb-Paragraph')
        return(
            <div className={clsNames}>
               <h3 onClick={()=> this.props.setAttributes({color: 'yellow'})}>Paragraph</h3>
            </div>
        )
    }
}

export default Paragraph;