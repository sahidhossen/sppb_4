import React from 'react';
import {withSelect, withDispatch} from 'store';
import {compose} from '../compose';

class AddonEditView extends React.Component {
    
    render() {
        const {
            name,
            getDefaultAddon,
            refs
        } = this.props;

        const defaultAddon = getDefaultAddon( name );
        if ( ! defaultAddon ) {
            return null;
        }
        const {Component} = defaultAddon;

        if ( ! Component ) {
            return null;
        }
        return <Component ref={refs} {...this.props}/>
    }
}


export default compose([
    withSelect( (select, ownProps ) => {
        const {
            getDefaultAddon
        } = select();
        
        return {
            getDefaultAddon
        }
    }),
    withDispatch( dispatch => {

    })
])(AddonEditView);