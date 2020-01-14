import React from 'react';
import classNames from 'classnames/bind';

class Column extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            onMouseOver: false
        }
    }

    render(){
        const clsNames = classNames('sppb-4')
        const style = { flex:1, borderWidth:1, borderStyle:'solid', borderColor:'red' }
        return(<div className={clsNames} style={style}>{this.props.renderChildren()}</div>)
    }
}

export default Column;