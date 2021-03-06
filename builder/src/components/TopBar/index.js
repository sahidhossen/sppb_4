import React from "react";
import Zoom from "./Zoom/Zoom";
import Right from "./Right/Right";
import Viewport from "./Viewport";
import AddonLibraries from "./AddonLibraries";
import { ViewContextProvider } from "../ViewContext";

class Topbar extends React.Component {
  render() {
    return (
      <div className="sppb-topbar-container">
        <div className="sppb-topbar-left">
          <div className="sppb-topbar-menu">
            <i className="x-icon-menu"></i>
          </div>
          <ViewContextProvider>
            <Zoom />
          </ViewContextProvider>
          <Viewport />
        </div>
        <AddonLibraries />

        <div className="sppb-topbar-right">
          <Right />
        </div>
      </div>
    );
  }
}

export default Topbar;
