import React, {Fragment} from 'react';
import {map} from 'lodash';
import {withSelect} from 'store';
import {compose} from '../compose';
import AddonListAddon from '../AddonListAddon'; 

class AddonList extends React.Component {

    render() {
        const {childAddonIds, parentId} = this.props
        return (
            <Fragment>
                {map(childAddonIds, (addonId, addonIndex) =>
                    <AddonListAddon
                        key={ 'addon-' + addonId }
                        index={ addonIndex }
                        addonId={ addonId }
                        parentId={ parentId }
                    />
                )}
            </Fragment>
        )
    }
}

export default compose([
    withSelect( (select, ownProps ) => {
        const { getChildrenIds } = select();
        const {parentId} = ownProps;
        return {
            childAddonIds: getChildrenIds(parentId)
        }
    })
])(AddonList);