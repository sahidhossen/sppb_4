import React from 'react';
import {withSelect} from 'store';
import { compose } from '../../../compose';
import AddonListItem from './AddonListItem';

class MyAddonList extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            addons: props.addons
        }
    }

    filterAddon(addonType) {
        return [];
    }

    render(){
        let { addonType } = this.props;
        let {addons} = this.state;
        let addonList = addonType === 'all' ? addons : this.filterAddon(addonType);
        return (
            <div className="sppb-addon-list-wrapper">
                {addonList.map( (addon, index) => {
                    if (addon.visibility === false){ 
                        return null;
                    }
                    return (
                        <div className="sppb-addon-list" key={index}>
                            <AddonListItem addon={addon}/>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default compose(
    withSelect( select => {
        let {getDefaultAddons} = select();
        return {
            addons: getDefaultAddons('array')
        }
    })
)(MyAddonList)