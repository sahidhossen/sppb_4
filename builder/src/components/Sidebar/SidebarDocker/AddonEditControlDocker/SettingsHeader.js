import React from 'react'; 
import {compose} from '../../../compose';
import {withSelect, withDispatch} from 'store';

const SettingsHeader = ({tabName, openDocker}) => {
    return (
        <div className="sppb-editor-panel">            
            <ul>
                <li className={tabName === 'style' ? 'active': ''} onClick={() => openDocker('style')}>Style</li>
                <li className={tabName === 'settings' ? 'active': ''} onClick={() => openDocker('settings')}>Settings</li>
                <li className={tabName === 'interaction' ? 'active': ''} onClick={() => openDocker('interaction')}>Interaction</li>
            </ul>
        </div>
    )
}

export default compose([
    withSelect( (select) => {
        const { getSelectedAddon } = select();
        const addon = getSelectedAddon();
        
    }),
    withDispatch( (dispatch) => {
        const {updateDocker} = dispatch();
        return {
            openDocker(tabName) {
                updateDocker('design',tabName)
            }
        }
    })
])(SettingsHeader)