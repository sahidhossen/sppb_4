import React, { Fragment } from "react";
// import DragDropContext from "./lib/DragDropContext";
// import DndBasement from './components/dndBasement';
import Docker from './components/Docker';
import SppbPortal from './components/sppbportal/SppbPortal';
import Canvas from './Canvas'; 

class Builder extends React.Component {
  
  render() {
    return (
      <Fragment>
        <Canvas/>
        <SppbPortal className="sppb-docker-portal">
              <Docker/>
          </SppbPortal>
      </Fragment>
    );
  }
}


export default Builder;