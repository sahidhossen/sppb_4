import React, { Fragment } from "react";
import { RightSidebar, LeftSidebar } from "../Sidebar";
import TopBar from "../TopBar";
import TopResizer from "../TopResizer";
import EditorXPortal from "../portal";

class Docker extends React.Component {
  render() {
    return (
      <EditorXPortal>
        <TopBar />
        <TopResizer />
        <LeftSidebar />
        <RightSidebar />
      </EditorXPortal>
    );
  }
}

export default Docker;
