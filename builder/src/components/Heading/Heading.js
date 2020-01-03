import React from 'react';
import {SPPBStore} from '../../SPPBStore';

import classNames from 'classnames/bind';

class Heading extends React.Component {
    constructor(props){
        super(props)
    }

    componentDidMount() {
        // this.props.setAttribute('title', 'custom title')
    }

    render(){
        const { block, getAttribute, setAttribute } = this.props
       
        const clsNames = classNames('sppb-4' ,'sppb-heading', block.id)
        return(
            <div className={clsNames}>
               <h1 onClick={()=> setAttribute('src', 'http://google.com')}>Heading</h1>
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