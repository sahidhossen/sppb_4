import React from 'react';
import { connect } from 'react-redux';
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
        const activeClass = classNames({'sppb-4-border-active': this.state.onMouseOver })
        const style = { maxWidth: attributes.width }
        return(
            <div 
                className={clsNames} 
                style={style}
                onMouseEnter={()=>this.setState({ onMouseOver: true })}
                onMouseLeave={()=>this.setState({ onMouseOver: false })}
            >
                <h3> Column Goes to here </h3>
            </div>
        )
    }
}


const mapStateToProps = ( state ) => {
    return {
      state
    };
  }
  
  const mapDispatchToProps = ( dispatch ) => {
    return {}
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Column);