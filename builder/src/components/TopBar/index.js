import React from "react";
import Zoom from "./Zoom/Zoom";
import Right from "./Right/Right"

class Topbar extends React.Component {
    render() {
        return (
            <div className="sppb-topbar-container">
                <div className="sppb-topbar-left">
                    <div className="sppb-topbar-menu">
                        <i className="fas fa-bars"></i>
                    </div>

                    <Zoom />
                    
                    <div className="sppb-responsive-btn">
                        <i className="fas fa-mobile"></i>
                        <span>Responsive</span>
                    </div>
                </div>
                <div className="sppb-topbar-middle">TopBar Middle</div>
                <div className="sppb-topbar-right">
                    <Right />
                </div>
            </div>
        );
    }
}

export default Topbar;
