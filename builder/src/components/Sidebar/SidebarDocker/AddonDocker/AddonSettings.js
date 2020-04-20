import React from 'react'; 
import { flowRight as compose } from 'lodash';
import {withSelect} from 'store';
import AddonDocker from './index';
import AddonHeader from './AddonHeader';
// import MyAddonList from './MyAddonList';
import AddonList from '../../../DefaultAddonList'

const SidebarSettings = ({tabName}) => (
    <AddonDocker
        name={tabName}
        label={'SPPB Sidebar'}
    >
        <AddonHeader tabName={tabName} />
        <div className="docker-panel">
            <AddonList addonType={tabName}/>
        </div>
    </AddonDocker>
)

export default compose(
    withSelect( (select) => {
        const {getActiveDockerName} = select();
        const dockerName = getActiveDockerName('addon');
        return {
            tabName: dockerName
        }
    })
)(SidebarSettings)
