import React from "react";
import SidebarHeader from "../SidebarHeader";

class StyleComponents extends React.Component {
    render() {
        return (
            <div className="sppb-docker-container sppb-style-component-docker">
                <SidebarHeader className={"right-sidebar-header"}>
                    <div className="sppb-sidebar-panel">
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
                        <p className="sppb-panel-title">Style Components</p>
                        <div className="sppb-sidebar-panel-body">
                            Body Text
                        </div>
                    </div>
                </SidebarHeader>
            </div>
        );
    }
}

export default StyleComponents;
