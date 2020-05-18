import React from 'react';
import classNames from 'classnames/bind';

class Paragraph extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        // console.log("Paragraph props",this.props)
        let {attributes, addonId} = this.props;
        let {
            gridArea
        } = attributes
        let style = {
            gridArea, 
            justifyContent: 'center',
            alignItems: 'center',
            display:"flex",
        }
        const clsNames = classNames('sppb-4' ,'sppb-Paragraph', addonId)
        return(
            <div data-id={addonId} style={style} className={clsNames}>
               <p onClick={()=> this.props.setAttributes({color: 'yellow'})}>Paragraph</p>
            </div>
        )
    }
}

export default Paragraph;