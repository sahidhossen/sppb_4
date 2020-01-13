import React from 'react';
import { SPPBStore } from "../../SPPBStore";
import classNames from 'classnames/bind';

/**
 * Whenever add a Column add default row and column
 */

class Column extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            onMouseOver: false
        }
    }

    render(){
        const { block, index } = this.props
        const {attributes} = block
        const clsNames = classNames('sppb-4', attributes.class, block.id)
        // const activeClass = classNames({'sppb-4-border-active': this.state.onMouseOver })
        const style = { flex:1, borderWidth:1, borderStyle:'solid', borderColor:'red' }
        return(<div className={clsNames} style={style}>{this.props.renderChildren()}</div>)
    }
}

export default SPPBStore(Column);