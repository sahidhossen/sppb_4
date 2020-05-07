import React from "react";
import { NavigatorDocker, NavigatorSettings } from "../SidebarDocker";
import SidebarHeader from "../SidebarHeader";

class LeftSidebar extends React.Component {
    render() {
        return (
            <div className="sppb-left-sidebar sppb-sidebar">
                <SidebarHeader className={"left-sidebar-header"}></SidebarHeader>

                <NavigatorSettings />
                <NavigatorDocker.Slot />
            </div>
        );
    }
}

export default LeftSidebar;
