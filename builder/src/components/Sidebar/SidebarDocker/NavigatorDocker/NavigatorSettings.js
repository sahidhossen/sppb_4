import React from "react";
import { compose } from "../../../compose";
import { withSelect } from "store";
import NavigatorDocker from "./index";
import NavigatorHeader from "./NavigatorHeader";
import AddonList from "../../../DefaultAddonList";
import Navigator from "../../../Navigator";

const SidebarSettings = ({ sidebarName }) => (
  <NavigatorDocker name={sidebarName} label={"SPPB Sidebar"}>
    <NavigatorHeader sidebarName={sidebarName} />
    <div className="sidebar-panel">
      {sidebarName === "addonlist" && <AddonList addonType={sidebarName} />}
      {sidebarName === "navigator" && <Navigator />}
      <div className="editor-x-navigation-collaps">Collaps All</div>
    </div>
  </NavigatorDocker>
);

export default compose(
  withSelect(select => {
    const { getActiveDockerName } = select();
    return {
      sidebarName: getActiveDockerName("navigator")
    };
  })
)(SidebarSettings);
