import React, { Fragment } from "react";
import { RightSidebar, LeftSidebar } from "../Sidebar";
import TopBar from "../TopBar";
import TopResizer from "../TopResizer";

class Docker extends React.Component {
  render() {
    return (
      <Fragment>
        <TopBar />
        <TopResizer />
        <LeftSidebar />
        <RightSidebar />
      </Fragment>
    );
  }
}

export default Docker;
