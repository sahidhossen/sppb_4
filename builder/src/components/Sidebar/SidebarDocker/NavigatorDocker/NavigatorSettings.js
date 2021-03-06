import React from "react";
import { compose } from "../../../compose";
import { withSelect } from "store";
import NavigatorDocker from "./index";
import NavigatorHeader from "./NavigatorHeader";
import Navigator from "../../../Navigator";

const SidebarSettings = ({ sidebarName }) => (
  <NavigatorDocker name={sidebarName} label={"SPPB Sidebar"}>
    <NavigatorHeader sidebarName={sidebarName} />
    <div className="sidebar-panel">{sidebarName === "navigator" && <Navigator />}</div>
  </NavigatorDocker>
);

export default compose(
  withSelect((select) => {
    const { getActiveDockerName } = select();
    return {
      sidebarName: getActiveDockerName("navigator"),
    };
  })
)(SidebarSettings);
