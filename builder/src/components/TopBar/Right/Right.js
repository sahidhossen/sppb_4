import React, { Fragment } from "react";
const Right = () => {
    return (
        <Fragment>
            <div className="sppb-tobbar-right-view">
                <i className="fas fa-sliders-h"></i>
                <span>View</span>
            </div>
            <div className="sppb-tobbar-right-preview">
            <i className="fas fa-play"></i>
                <span>Preview</span>
            </div>
            <div className="sppb-tobbar-right-publish">
                <button className="sppb-btn sppb-btn-default">Publish</button>
            </div>
            <div className="sppb-tobbar-right-user">
                <span className="sppb-right-username">M</span>
            </div>
        </Fragment>
    );
};

export default Right;
