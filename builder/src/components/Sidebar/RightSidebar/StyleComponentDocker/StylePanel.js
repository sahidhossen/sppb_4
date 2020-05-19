import React from 'react';
import {
    SpacingComponent,
    withStyleContext
} from 'style-blocks'; 

import {withSelect, withDispatch} from 'store';

import {compose} from '../../../compose';

class StylePanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addonId: null
        }
    }
    
    static getDerivedStateFromProps( prevProps, state ) {
        const { addonId, computeStyle } = prevProps;
        if (prevProps.addonId !== state.addonId) {
            computeStyle();
            return {addonId}
        }
        return state;
    }


    render() {
        let {styleState, setCssAttributes} = this.props;
        let { spacing } = styleState;
        return(
            <div className="style-panel">
              <h1> Wokring with style</h1>
              <SpacingComponent
                style={spacing}
                setCssAttributes={setCssAttributes}
              />
            </div>
        )
    }
}
export default compose(
    withStyleContext( ownProps => {
        console.log("ownProps: ", ownProps)
    })
)(StylePanel);