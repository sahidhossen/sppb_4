import React from 'react';
import {SPPBStore} from '../../SPPBStore';

import classNames from 'classnames/bind';

class Heading extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        const { block } = this.props
        // console.log("ehading props",block)
        const clsNames = classNames('sppb-4' ,'sppb-heading', block.id)
        return(
            <div className={clsNames}>
               <h1>Heading</h1>
            </div>
        )
    }
}


// const mapStateToProps = ( state ) => {
//     return {
//       state
//     };
//   }
  
//   const mapDispatchToProps = ( dispatch ) => {
//     return {attribute:{}, store:{}}
//   }
  
//   export default connect(
//     mapStateToProps,
//     mapDispatchToProps
//   )(Heading);
export default SPPBStore(Heading);