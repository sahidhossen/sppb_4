import React from 'react';
import {select} from 'store';

class AddonEditView extends React.Component {
    
    render() {
        const {
            name,
            refs
        } = this.props;

        let {getDefaultAddon} = select();
        let addon = getDefaultAddon(name);
        
        if ( ! addon ) {
            return null;
        }
        const {Component} = addon;

        if ( ! Component ) {
            return null;
        }

        return <Component ref={refs} {...this.props}/>
    }
}

export default AddonEditView;