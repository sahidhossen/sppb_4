import React from "react";
const TagsBtn = ({ url = "#", className, style, text = "Tags" }) => {
    return (
        <a
            href={url}
            className={`sppb-tags-btn${className ? " " + className : ""}`}
            style={style}
        >
            {text}
        </a>
    );
};

export default TagsBtn;
