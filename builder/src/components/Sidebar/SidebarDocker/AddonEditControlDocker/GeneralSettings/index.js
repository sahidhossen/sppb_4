import React, {Fragment} from 'react'; 
import { flowRight as compose } from 'lodash';
import {withSelect} from 'store';
import AddonControls from '../../../../AddonControls';

class GeneralSettings extends React.Component {
    render() {
        const { addon } = this.props;
        return (
            <Fragment>
                <div className="sppb-addon-title">
                    <h3 className="sppb-title">{addon.name}</h3>
                    {addon.details && <p>{addon.details}</p> }
                </div>
                <AddonControls.Slot />
            </Fragment>
        )
    }
}

export default compose(
    withSelect( (select) => {
        const { getSelectedAddon } = select();
        return {
            addon: getSelectedAddon()
        }
    })
)(GeneralSettings)