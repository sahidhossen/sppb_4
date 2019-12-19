import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {testIframe} from '../../actions';
import { addonList } from '../../reducers/addonList';
import AddonItem from '../AddonItem';

class AddonList extends Component {
  constructor(props){
    super()
  }
  render() {
    const { enable_tools } = this.props
    const translateValue = !enable_tools ? '-100%' : '0'
    const style = {
      transition:'transform 150ms linear 0s',
      transform: `translate3d(${translateValue}, 0px, 0px)`
    }
    return (
        <div className="sppb-tools-container" style={style}>
          <div className="sppb-tool-title row m-0"> 
            <h3 className="sppb-title"> Add Elements </h3>
          </div>
          <div className="sppb-tools-main">
          { Object.keys(addonList).map( (key, index) => {
                    let blocks   = addonList[key].list;
                    let title = addonList[key].title;
              return (
                <Fragment key={index}>
                  <div className="sppb-block-list-title"> <h3 className="sppb-title">{title}</h3> </div>
                    <div className="row m-0 sppb-tools">
                    { blocks.map( block => {
                      return (
                        <div className="sppb-tool col-6" key={block.id}>
                          <AddonItem block={block}/>
                        </div>
                      )
                    })}
                  </div>
                </Fragment>
              )
            })}
          </div>
        </div>
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
)(AddonList);