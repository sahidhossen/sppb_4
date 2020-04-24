import React from 'react';
import classNames from 'classnames/bind';

class Paragraph extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        // console.log("Paragraph props",this.props)
        let {attributes} = this.props;
        let {
            gridArea
        } = attributes
        let style = {
            gridArea, 
            justifyContent: 'center',
            alignItems: 'center',
            display:"grid",
            backgroundColor:'rgba(0,0,0,0.2)'
        }
        const clsNames = classNames('sppb-4' ,'sppb-Paragraph')
        return(
            <div style={style} className={clsNames}>
               <h3 onClick={()=> this.props.setAttributes({color: 'yellow'})}>Paragraph</h3>
            </div>
        )
    }
}

export default Paragraph;