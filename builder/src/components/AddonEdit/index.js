import React from 'react';
import {BlockEditContextProvider} from '../AddonEditContext';
import AddonEditView from './AddonEditView';

class AddonEdit extends React.Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    static getDerivedStateFromProps( props ) {
		const { addonId, name, isSelected } = props;
		return {
			name,
			isSelected,
			addonId,
		};
    }
    
    render(){
        console.log("prop: ", this.props)
        return (
            <BlockEditContextProvider value={this.state}>
                <AddonEditView {...this.props}/>
            </BlockEditContextProvider>
        )
    }
}
export default AddonEdit;