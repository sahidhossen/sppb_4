import React from "react";

class Zoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            zoomValue: 100
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(clickType) {
        const stateUpdate = 10;
        const iframe = window.frames["sppb-editor-view"];
        const body = iframe.document.querySelector('.layout-edit-iframe');
        if (
            typeof clickType !== "undefined" &&
            clickType === "minus" &&
            this.state.zoomValue > 10
        ) {
            this.setState({ zoomValue: this.state.zoomValue - stateUpdate });
            body.style.transform = `scale(${(this.state.zoomValue - stateUpdate) / 100})`

        } else if (this.state.zoomValue < 100 && clickType !== "minus") {
            this.setState({ zoomValue: this.state.zoomValue + stateUpdate });
            body.style.transform = `scale(${(this.state.zoomValue + stateUpdate) / 100})`
        }
    }
    
    render() {
        return (
            <div className="sppb-zoom-controller">
                <span className="sppb-zoom-minus" onClick={() => this.handleClick("minus")} >-</span>
                <span className="sppb-zoom"><span className="sppb-zoom-value"></span>{this.state.zoomValue}%</span>
                <span className="sppb-zoom-plus" onClick={() => this.handleClick()}>+</span>
            </div>
        );
    }
}

export default Zoom;
