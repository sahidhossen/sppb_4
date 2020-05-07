import React from "react";
import { withSelect, withDispatch } from "store";
import { compose } from "../compose";

class Navigator extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const elmWidth = 7;
        const lineHeight = 24;
        return (
            <div className="editor-x-navigator">
                <div
                    className="editor-x-navigator-layer editor-x-layer-depth-1"
                    style={{
                        "--elmWidth": elmWidth * 1 + "px", // mutiply by depth
                        "--dot-line-height": lineHeight * 5 + "px" //Multiply by children number
                    }}
                >
                    <span className="fas fa-grip-horizontal editor-x-navigator-drag"></span>
                    <div
                        className="editor-x-navigator-fake-element"
                        style={{ height: "24px", width: "var(--elmWidth)" }}
                    ></div>
                    <div className="editor-x-navigator-content">
                        <div className="editor-x-navigator-collaps">
                            <i className="fas fa-caret-down"></i>
                        </div>
                        <span className="editor-x-navigator-hash">#</span>
                        <span className="editor-x-navigator-text">
                            Hero section
                        </span>
                    </div>
                    <span className="fas fa-ellipsis-h editor-x-navigator-dot-btn"></span>
                </div>
                <div
                    className="editor-x-navigator-layer editor-x-layer-depth-2"
                    style={{
                        "--elmWidth": elmWidth * 2 + "px", // Multiply by depth
                        "--dot-line-height": lineHeight * 4 + "px" // Multiply by children
                    }}
                >
                    <span className="fas fa-grip-horizontal editor-x-navigator-drag"></span>
                    <div
                        className="editor-x-navigator-fake-element"
                        style={{ height: "24px", width: "var(--elmWidth)" }}
                    ></div>
                    <div className="editor-x-navigator-content">
                        <div className="editor-x-navigator-collaps">
                            <i className="fas fa-caret-down"></i>
                        </div>
                        <span className="editor-x-navigator-hash">#</span>
                        <span className="editor-x-navigator-text">
                            Container
                        </span>
                    </div>
                    <span className="fas fa-ellipsis-h editor-x-navigator-dot-btn"></span>
                </div>
                <div
                    className="editor-x-navigator-layer editor-x-layer-depth-3"
                    style={{
                        "--elmWidth": elmWidth * 3 + "px", // multiply by depth
                        "--dot-line-height": lineHeight * 3 + "px" // multiply by children
                    }}
                >
                    <span className="fas fa-grip-horizontal editor-x-navigator-drag"></span>
                    <div
                        className="editor-x-navigator-fake-element"
                        style={{ height: "24px", width: "var(--elmWidth)" }}
                    ></div>
                    <div className="editor-x-navigator-content">
                        <div className="editor-x-navigator-collaps">
                            <i className="fas fa-caret-down"></i>
                        </div>
                        <span className="editor-x-navigator-hash">#</span>
                        <span className="editor-x-navigator-text">
                            Hero Grid
                        </span>
                    </div>
                    <span className="fas fa-ellipsis-h editor-x-navigator-dot-btn"></span>
                </div>
                <div
                    className="editor-x-navigator-layer editor-x-layer-depth-4"
                    style={{
                        "--elmWidth": elmWidth * 4 + "px", // mutiply by depth
                        "--dot-line-height": lineHeight * 2 + "px" // multiply by children
                    }}
                >
                    <span className="fas fa-grip-horizontal editor-x-navigator-drag"></span>
                    <div
                        className="editor-x-navigator-fake-element"
                        style={{ height: "24px", width: "var(--elmWidth)" }}
                    ></div>
                    <div className="editor-x-navigator-content">
                        <div className="editor-x-navigator-collaps">
                            <i className="fas fa-caret-down"></i>
                        </div>
                        <span className="editor-x-navigator-hash">#</span>
                        <span className="editor-x-navigator-text">
                            Left Hero Block
                        </span>
                    </div>
                    <span className="fas fa-ellipsis-h editor-x-navigator-dot-btn"></span>
                </div>
                <div
                    className="editor-x-navigator-layer editor-x-layer-depth-5 editor-x-layer-has-no-children"
                    style={{
                        "--elmWidth": elmWidth * 5 + "px" // mutiply by depth
                    }}
                >
                    <span className="fas fa-grip-horizontal editor-x-navigator-drag"></span>
                    <div
                        className="editor-x-navigator-fake-element"
                        style={{ height: "24px", width: "var(--elmWidth)" }}
                    ></div>
                    <div className="editor-x-navigator-content">
                        <div className="editor-x-navigator-collaps">
                            <i className="fas fa-caret-down"></i>
                        </div>
                        <span className="editor-x-navigator-hash">#</span>
                        <span className="editor-x-navigator-text">
                            H1 Hero Title
                        </span>
                    </div>
                    <span className="fas fa-ellipsis-h editor-x-navigator-dot-btn"></span>
                </div>
                <div
                    className="editor-x-navigator-layer editor-x-layer-depth-5 editor-x-layer-has-no-children"
                    style={{
                        "--elmWidth": elmWidth * 5 + "px" // mutiply by depth
                    }}
                >
                    <span className="fas fa-grip-horizontal editor-x-navigator-drag"></span>
                    <div
                        className="editor-x-navigator-fake-element"
                        style={{ height: "24px", width: "var(--elmWidth)" }}
                    ></div>
                    <div className="editor-x-navigator-content">
                        <div className="editor-x-navigator-collaps">
                            <i className="fas fa-caret-down"></i>
                        </div>
                        <span className="editor-x-navigator-hash">#</span>
                        <span className="editor-x-navigator-text">
                            P Hero Paragraph
                        </span>
                    </div>
                    <span className="fas fa-ellipsis-h editor-x-navigator-dot-btn"></span>
                </div>
                <div
                    className="editor-x-navigator-layer editor-x-layer-depth-1"
                    style={{
                        "--elmWidth": elmWidth * 1 + "px", // mutiply by depth
                        "--dot-line-height": lineHeight * 1 + "px" // mutiply by children
                    }}
                >
                    <span className="fas fa-grip-horizontal editor-x-navigator-drag"></span>
                    <div
                        className="editor-x-navigator-fake-element"
                        style={{ height: "24px", width: "var(--elmWidth)" }}
                    ></div>
                    <div className="editor-x-navigator-content">
                        <div className="editor-x-navigator-collaps">
                            <i className="fas fa-caret-down"></i>
                        </div>
                        <span className="editor-x-navigator-hash">#</span>
                        <span className="editor-x-navigator-text">
                            Clients section
                        </span>
                    </div>
                    <span className="fas fa-ellipsis-h editor-x-navigator-dot-btn"></span>
                </div>
            </div>
        );
    }
}

export default compose(
    withSelect(select => {
        let { getAddons } = select();
        return {
            addons: getAddons()
        };
    })
)(Navigator);
