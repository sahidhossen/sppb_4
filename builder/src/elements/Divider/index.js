import React from "react";
const Divider = (props) => {
  const { height = "1px", background = "#3a404c", margin = "10px 0" } = props;
  return (
    <div
      className="editor-x-divider"
      style={{ background: background, height: height, margin: margin }}
    ></div>
  );
};

export default Divider;
