import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import {getBlockById} from '../../lib/utils';

class Section extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        const { block, builder } = this.props
        const clsNames = classNames('sppb-4' ,'sppb-row', block.id)
        
        return(
            <div className={clsNames}>
                {block.childrens.length > 0 &&  block.childrens.map( (blockId, index) => {
                    const block = getBlockById(builder, blockId)
                    const { Component } = block
                    return (
                        <Component
                            key={blockId}
                            index={index}
                            builder={builder}
                            block={block}
                        />
                    )
                })}
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
  )(Section);