import React from 'react'; 
import {compose} from '../../../compose';
import {withSelect} from 'store';
import NavigatorDocker from './index';
import NavigatorHeader from './NavigatorHeader';
import AddonList from '../../../DefaultAddonList';

const SidebarSettings = ({sidebarName}) => (
    <NavigatorDocker
        name={sidebarName}
        label={'SPPB Sidebar'}
    >
        <NavigatorHeader sidebarName={sidebarName} />
        <div className="sidebar-panel">
            { sidebarName === 'addonlist'  && <AddonList addonType={sidebarName}/> }
           Selected Navigator Sidebar {sidebarName}
        </div>
    </NavigatorDocker>
)

export default compose(
    withSelect( (select) => {
        const {getActiveDockerName} = select();
        return {
            sidebarName: getActiveDockerName('navigator')
        }
    })
)(SidebarSettings)
