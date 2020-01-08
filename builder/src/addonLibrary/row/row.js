import React from 'react';
import {SPPBStore} from '../../SPPBStore';
import classNames from 'classnames/bind';

class Row extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        const clsNames = classNames('sppb-4' ,'sppb-row')
        return(
            <div className={clsNames}>
                <h1 style={{textAlign:"center"}}> Row </h1>
            </div>
        )
    }
}

export default SPPBStore(Row);