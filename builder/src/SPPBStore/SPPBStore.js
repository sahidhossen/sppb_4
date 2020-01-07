import React from 'react';
import {connect} from 'react-redux';
import {setAttribute} from '../actions';

const StoreHoc = (PureComponent) => {
    class HOC extends React.Component {
        render() {
            return <PureComponent {...this.props} />   
        }
    }
    const mapStateToProps = ( state ) => {
        const {data} = state
        const { present:{builder}} = data;
        return {
            builder
        };
    }
    
    const mapDispatchToProps = ( dispatch, ownProps ) => {
        return {
            getAttribute: (name) => {
                name = name.toLowerCase();
                const {block: {attributes}} = ownProps;
                return attributes[name] ? attributes[name] : 'Attribute not found';
            }, 
            setAttribute: (name, value) => {
                name = name.toLowerCase();
                const payload = {
                    id: ownProps.block.id,
                    attr: { [name]: value }
                }
                dispatch(setAttribute(payload))
            }
        }
    }

    return connect( mapStateToProps,mapDispatchToProps)(HOC)
}

export default StoreHoc;