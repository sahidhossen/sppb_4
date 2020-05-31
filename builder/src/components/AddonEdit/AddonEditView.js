import React from 'react';
import classnames from 'classnames';
import {select} from 'store';

class AddonEditView extends React.Component {
    
    render() {
        const {
            name, 
            addonId
        } = this.props;

        let {getDefaultAddon, getAddonStyleClassName} = select();

        let addon = getDefaultAddon(name);
        
        if ( ! addon ) {
            return null;
        }

        let classNames = classnames( `editor-x-${name.toLowerCase()}`, getAddonStyleClassName(addonId) )

        const {Component} = addon;

        if ( ! Component ) {
            return null;
        }

        return <Component {...this.props} className={classNames} />
    }
}

export default AddonEditView;