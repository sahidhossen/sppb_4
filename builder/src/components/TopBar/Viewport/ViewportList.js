import React, { Component } from "react";

class ViewportList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            contextStyle: {
                visibility: "none"
            }
        };
	}
	
    componentDidMount() {
        document.addEventListener("mousedown",this.handleClickOutside.bind(this));
        window.frames["sppb-editor-view"].document.addEventListener("mousedown",this.handleClickOutside.bind(this));
        this.getContextMenuPosition();
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown",this.handleClickOutside.bind(this));
        window.frames["sppb-editor-view"].document.removeEventListener("mousedown",this.handleClickOutside.bind(this));
	}
	
    handleClickOutside(event) {
        if (
            this.contextMenuWrapper &&
            !this.contextMenuWrapper.contains(event.target)
        ) {
            this.props.reset();
        }
    }

    getContextMenuPosition() {
        let { event } = this.props;
        if (this.contextMenuTimer) {
            clearTimeout(this.contextMenuTimer);
        }
        this.contextMenuTimer = setTimeout(() => {
            
            const rect = this.contextMenuWrapper.getBoundingClientRect();
            const targetRect = this.props.target.getBoundingClientRect();
            const docRect = document.body.getBoundingClientRect();
            // console.log("wo: ", docRect)
            let leftDistance = event.clientX + docRect.left;
            let topDistance = targetRect.y + targetRect.height; // Right after the element
            // calculating left position
            if (event.clientX + rect.width > docRect.left + docRect.width) {
                leftDistance = event.clientX - rect.width;
            }
            // calculating top position
            if (event.clientY + rect.height > window.innerHeight) {
                topDistance = event.clientY - rect.height;
            }

            this.setState({
                contextStyle: {
                    visibility: "visible",
                    top: topDistance + "px",
                    left: leftDistance + "px"
                }
            });
        });
	}
	
    render() {
        let {viewports} = this.props;
        return (
            <div
                className="sppb-viewport-list sppb-popup"
                style={this.state.contextStyle}
                ref={ref => {
                    this.contextMenuWrapper = ref;
                }}
            >
                <ul className="sppb-list-menu">
                    {Object.keys(viewports).map( name => {
                        let viewport = viewports[name];
                        return (
                            <li key={name} onClick={() => this.props.update(name)}> 
                                <div className="sppb-viewport-icon"><i className={viewport.icon}></i></div>
                                <div className="sppb-viewport-title">
                                    <h3 className="sppb-title">{viewport.title} </h3>
                                    <span className="sppb-notes">{viewport.value} and down</span>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        );
    }
}

export default ViewportList;
