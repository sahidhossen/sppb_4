import React, { Fragment } from 'react'; 
import {compose} from '../../../compose';
import {withSelect} from 'store';
import AddonEditControlsDocker from './index';
import SettingsHeader from './SettingsHeader';
import StyleSettings from './StyleSettings';
import GeneralSettings from './GeneralSettings';
 

const SidebarSettings = ({sidebarName, selectedId}) => (
    <AddonEditControlsDocker
        name={sidebarName}
        label={'Addon Settings'}
    >

        <SettingsHeader sidebarName={sidebarName} />

        <div className="sidebar-panel">
            {
            selectedId === null 
            ? 
                <div className="empty-panel"> Please Select Addon </div>
            :
            <Fragment>
                {sidebarName === 'settings' && 
                    <GeneralSettings/>
                }
                {sidebarName === 'style' && 
                    <StyleSettings />
                }
            </Fragment>
            }
        </div>
    </AddonEditControlsDocker>
)

export default compose(
    withSelect( (select) => {
        const {getActiveDockerName, selectedAddonId} = select();
        return {
            sidebarName: getActiveDockerName('design'),
            selectedId: selectedAddonId()
        }
    })
)(SidebarSettings)