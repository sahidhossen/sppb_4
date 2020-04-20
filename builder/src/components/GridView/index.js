import React, { Fragment, useState, useEffect } from 'react';
import getGridAxis from './gridAxis';

// class GridView extends React.Component {
//     componentDidMount(){
//         console.log("grid:", this.props.refs.current)

//     }
//     render(){
//         let {refs} = this.props;
      
//         // const [gridStartIndex, gridFinishIndex] = getGridAxis(refs);
       
//         return (
//         <Fragment>
//             { this.props.children}
//         </Fragment>
//         )
//     }
// }

// export default GridView;

const GridView = ({refs, children}) => {
    
    const [ref, setRef] = useState(null);

    const attribute = {
      gridWidth: "940px",
      gridGap: "10px",
      gridCol: 20,
    };

    useEffect(() => {
        console.log("refs: ", refs)
        if (refs.current !== null) {
            setRef(refs)
        }
    }, [])

    const [gridStartIndex, gridFinishIndex] = getGridAxis(ref);

    console.log("GRID: ", gridStartIndex, gridFinishIndex)
    return (
        <Fragment>
            {children}
        </Fragment>
    );
  };
  
  export default GridView;