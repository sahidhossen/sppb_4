import React from "react";
import SidebarHeader from "../SidebarHeader";

class StyleComponents extends React.Component {
  render() {
    return (
      <div className="sppb-docker-container sppb-style-component-docker">
        <SidebarHeader className={"right-sidebar-header"}>
          <div className="sppb-top-alignment">
            <span className="sppb-top-collaps-icon">
              <i className="fas fa-angle-double-right"></i>
            </span>
            <span className="sppb-top-alignment-icon">
              <i className="fas fa-columns"></i>
              <i className="fas fa-columns"></i>
              <i className="fas fa-columns"></i>
            </span>
          </div>
        </SidebarHeader>
        <div className="sppb-panel-body">
          <h3 className="title">Styel Components</h3>
        </div>
      </div>
    );
  }
}

export default StyleComponents;
