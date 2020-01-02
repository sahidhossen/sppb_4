import {connect} from 'react-redux';
import React from 'react';

const StoreHoc = (PureComponent) => {
    class HOC extends React.Component {
        render() {
            return <PureComponent {...this.props} />   
        }
    }
    const mapStateToProps = ( state ) => {
        const {builderData} = state
        const { present:{builder}} = builderData;
        return {
            builder
        };
    }
    
    const mapDispatchToProps = ( dispatch ) => {
        return {
            getAttribute: (name) => { return {value: name} }, 
            setAttribute: ({name, value}) => { return {name, value}}
        }
    }

    return connect( mapStateToProps,mapDispatchToProps)(HOC)
}

export default StoreHoc;