import React from "react";
import {select} from 'store';
import {cloneDeep} from 'lodash';
import DragDropContext from "./lib/DragDropContext";

class Builder extends React.Component {
  render() {
    const {root} = select('data');
    const {Component, id } = root;
    console.log("update: ", root)
    return (
      <div className="sppb-builder-wrapper">
        <Component addonId={id} block={root}/> 
      </div>
    );
  }
}

export default DragDropContext(Builder);
