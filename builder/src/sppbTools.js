import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import AddonList from './toolsComponent/AddonList';
import DragDropContext from './lib/DragDropContext';

class SppbTools extends Component {
  constructor(props){
    super()
    this.state = {
      enable_tools: false
    }
  }
  render() {
    return (
      <Fragment>
        <div className="sppb-tools-menu">
              <ul className="sppb-ul">
                  <li className="sppb-control-item" onClick={()=>this.setState({ enable_tools: !this.state.enable_tools })}> <span className={this.state.enable_tools ? `fa fa-angle-left` : `fa fa-angle-right`}></span></li>
              </ul>
        </div>
        
        <AddonList enable_tools={this.state.enable_tools} />

      </Fragment>
    );
  }
}

const mapStateToProps = ( state ) => {
  return {
    state
  };
}

const mapDispatchToProps = ( dispatch ) => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DragDropContext(SppbTools));