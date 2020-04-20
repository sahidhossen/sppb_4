import React, {Fragment} from 'react';
import {map} from 'lodash';
import {withSelect, withDispatch} from 'store';
import {compose} from '../compose';
import AddonListAddon from '../addonListAddon'; 

class AddonList extends React.Component {
    constructor(props) {
        super(props)
    }

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
        const {
            getChildrenIds
        } = select();
        const {parentId} = ownProps;
        return {
            childAddonIds: getChildrenIds(parentId)
        }
    }),
    withDispatch( dispatch => {

    })
])(AddonList);