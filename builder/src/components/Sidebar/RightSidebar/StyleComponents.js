import React from "react";
import SidebarHeader from "../SidebarHeader";

class StyleComponents extends React.Component {
<<<<<<< HEAD
    render() {
        return (
            <div className="sppb-docker-container sppb-style-component-docker">
                <SidebarHeader className={"right-sidebar-header"}>
                    <div className="sppb-sidebar-panel">
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
                        <p className="sppb-panel-title">Style Components</p>
                        <div className="sppb-sidebar-panel-body">
                            Body Text
                        </div>
                    </div>
                </SidebarHeader>
            </div>
        );
    }
=======
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
>>>>>>> 641c48ec6ca6514cc36e4d70f8bb6c42f99fc5e2
}

export default StyleComponents;
