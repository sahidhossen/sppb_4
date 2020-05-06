import React from "react";
import { NavigatorDocker, NavigatorSettings } from "../SidebarDocker";
import SidebarHeader from "../SidebarHeader";

class LeftSidebar extends React.Component {
    render() {
        return (
            <div className="sppb-left-sidebar sppb-sidebar">
                <SidebarHeader className={"left-sidebar-header"}>
                    <div className="sppb-sidebar-icons">
                        <span className="sppb-drag-icon">
                            <i className="fas fa-braille"></i>
                        </span>
                        <span className="sppb-sidebar-panel-icon">
                            <i className="fas fa-columns"></i>
                            <i className="fas fa-columns"></i>
                            <i className="fas fa-columns"></i>
                        </span>
                    </div>
                </SidebarHeader>

                <NavigatorSettings />
                <NavigatorDocker.Slot />
            </div>
        );
    }
}

export default LeftSidebar;
