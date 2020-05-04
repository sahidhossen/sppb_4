import React from "react";
import SidebarHeader from "../SidebarHeader";
import AddonControls from "../../AddonControls";

class ReusableComponent extends React.Component {
    render() {
        return (
            <div className="sppb-docker-container sppb-reusable-component-docker">
                <SidebarHeader className={"right-sidebar-header"}>
                    <span className="sppb-drag-icon">
                        <i className="fas fa-braille"></i>
                    </span>
                    <div className="sppb-reusable-content">
                        <p className="sppb-reuseable-title">
                            Reusable Styles <span>(Class & Combo Class)</span>
                        </p>
                        <div className="sppb-reusable-content-body">
                            <AddonControls.Slot />
                        </div>
                    </div>
                </SidebarHeader>
            </div>
        );
    }
}

export default ReusableComponent;
