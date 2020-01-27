import React from "react";
import DragDropContext from "./lib/DragDropContext";
import DndBasement from './components/dndBasement';
import AddonList from './components/addonList'; 

class Builder extends React.Component {
  render() {
    return (
      <div className="sppb-builder-wrapper">
          <AddonList/>
          <DndBasement/>
      </div>
    );
  }
}


export default DragDropContext(Builder);