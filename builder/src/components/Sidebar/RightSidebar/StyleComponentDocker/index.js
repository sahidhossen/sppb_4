import React from "react";
import SidebarHeader from "../../SidebarHeader";
import { withSelect, withDispatch } from 'store';
import { compose } from '../../../compose';
import StylePanelHeader from './StylePanelHeader'; 
import StylePanelBody from './StylePanelBody';

import {  styleData } from 'style-blocks'; 

class StyleComponentDocker extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            styleStore: {
                value: {...styleData}
            }
        }
    }

   

    render() {
        // console.log("state: ", this.state)
        let {addonId, addonStyleBlockIds, selectedBlockId} = this.props;
        return (
            <div className="sppb-docker-container sppb-style-component-docker">
                <SidebarHeader className={"right-sidebar-header"}>
                    <div className="sppb-sidebar-icons">
                        <span className="sppb-sidebar-panel-icon">
                            <i className="fas fa-columns"></i>
                            <i className="fas fa-columns"></i>
                            <i className="fas fa-columns"></i>
                        </span>
                        <span className="sppb-drag-icon">
                            <i className="fas fa-braille"></i>
                        </span>
                    </div>
                </SidebarHeader>
                <div className="sppb-sidebar-panel">
                    <StylePanelHeader 
                        addonId={addonId}
                        addonStyleBlockIds={addonStyleBlockIds}
                    />
                    <StylePanelBody 
                        addonId={addonId}
                        selectedBlockId={selectedBlockId}
                        addonStyleBlockIds={addonStyleBlockIds}
                    />
                </div>
            </div>
        );
    }
}

export default compose(
    withSelect( (select)=> {
        const {selectedAddonId, getAddonStyleBlockIds} = select();
        let addonId = selectedAddonId();
        let addonStyleBlockIds = getAddonStyleBlockIds(addonId)
        return {
            addonId,
            addonStyleBlockIds, 
            selectedBlockId: addonStyleBlockIds.length ? addonStyleBlockIds[0] : null
        }
    })

)(StyleComponentDocker);
