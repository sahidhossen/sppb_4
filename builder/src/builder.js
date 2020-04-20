import React, { Fragment } from "react";
import DragDropContext from "./lib/DragDropContext";
import DndBasement from './components/dndBasement';
import AddonList from './components/addonList';
import Docker from './components/Docker';
import SppbPortal from './components/sppbportal/SppbPortal';
import GridView from './components/GridView';

class Builder extends React.Component {
  constructor(){
    super(); 

    this.ref = React.createRef();
  }
  render() {
    return (
      <Fragment>
         <GridView refs={this.ref}>
          <div className="sppb-builder-wrapper" ref={this.ref}> 
              <AddonList/>
          </div>   
        </GridView>
        <SppbPortal className="sppb-docker-portal">
              <Docker/>
          </SppbPortal>
      </Fragment>
    );
  }
}


export default DragDropContext(Builder);