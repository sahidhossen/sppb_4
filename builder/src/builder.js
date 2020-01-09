import React, { Fragment } from "react";
import { connect } from "react-redux";
import DragDropContext from "./lib/DragDropContext";

class Builder extends React.Component {
  render() {
    const { state} = this.props;
    const { builder } = state.data.present;
    const {root} = builder;
    const {Component, id } = root;
    
    return (
      <div className="sppb-builder-wrapper">
        <Component addonId={id} block={root}/> 
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    state
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DragDropContext(Builder));
