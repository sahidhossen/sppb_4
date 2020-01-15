import React from "react";
import {connect} from 'react-redux';
import DragDropContext from "./lib/DragDropContext";

class Builder extends React.Component {
  render() {
    const {root} = this.props;
    const {Component, id } = root;
    console.log("initial")
    return (
      <div className="sppb-builder-wrapper">
        <Component addonId={id} block={root}/> 
      </div>
    );
  }
}
const mapStateToProps = state => {
  const { data: {present} } = state;
  const {builder: {root} } = present;
  return { root };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(DragDropContext(Builder));
