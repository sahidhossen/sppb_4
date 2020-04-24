import React from "react";
import Zoom from "./Zoom/Zoom";
import Right from "./Right/Right"
import Viewport from './Viewport';

class Topbar extends React.Component {
    render() {
        return (
            <div className="sppb-topbar-container">
                <div className="sppb-topbar-left">
                    <div className="sppb-topbar-menu">
                        <i className="fas fa-bars"></i>
                    </div>

                    <Zoom />
                    <Viewport/>
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
