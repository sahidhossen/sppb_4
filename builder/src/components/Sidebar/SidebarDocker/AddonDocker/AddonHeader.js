import React from 'react'; 
import { flowRight as compose } from 'lodash';
import {withSelect, withDispatch} from 'store';

/**
 * @param {Object} param
 */
const SettingsHeader = ({tabName, openDocker}) => {
    return (
        <div className="sppb-editor-panel">            
            <ul>
                <li className={tabName === 'recent' ? 'active': ''} onClick={() => openDocker('recent')}>Recent</li>
                <li className={tabName === 'all' ? 'active': ''} onClick={() => openDocker('all')}>All</li>
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
                updateDocker('addon',tabName)
            }
        }
    })
])(SettingsHeader)