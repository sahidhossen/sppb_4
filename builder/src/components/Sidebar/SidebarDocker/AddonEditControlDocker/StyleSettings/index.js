import React from 'react';
import {compose} from '../../../../compose';
import {withSelect, withDispatch} from 'store'
import StyleComponent from './StyleComponent';


class StyleSettings extends React.Component {
    constructor(props){
        super(props)
        this.onUpdateAttributes = this.onUpdateAttributes.bind(this)
    }
    onUpdateAttributes(attributes) {
        let {addonId, setAttributes} = this.props; 
        setAttributes(addonId, attributes )
    }

    render(){

        if (addonId === null ) {
            return null;
        }

        let {
            addonId, 
            attributes, 
            fields
        } = this.props;
        return (
            <StyleComponent
                addonId = {addonId}
                attributes = {attributes}
                setAttributes = {this.onUpdateAttributes}
            />
        )
    }
}

export default compose(
  withSelect(select => {
    const { getAddonAttributes, selectedAddonId } = select();
    let addonId = selectedAddonId();
    return {
      addonId,
      attributes: getAddonAttributes(addonId)
    };
  }),

  withDispatch(dispatch => {
    let { updateAddonAttributes } = dispatch();
    return {
      setAttributes(addonId, attribute) {
        updateAddonAttributes(addonId, attribute);
      }
    };
  })
)(StyleSettings);
