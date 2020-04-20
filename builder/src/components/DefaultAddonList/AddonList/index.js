import React, { Component, Fragment } from 'react';
import { compose } from '../../compose';
import {withSelect} from 'store';
import {blockListForTools} from '../../../lib/utils';
import AddonItem from '../AddonItem';

class AddonList extends Component {
  constructor(props){
    super()
  }
  render() {
    const { addonList } = this.props
    const _blocklist = blockListForTools(addonList);
    return (
      <Fragment>
          { Object.keys(_blocklist).map( (key, index) => {
              let blocks = _blocklist[key].list;
              let title = _blocklist[key].title;
              return (
                <Fragment key={index}>
                  <div className="sppb-block-list-title sppb-addon-list"> <h3 className="sppb-title">{title}</h3> </div>
                    <div className="sppb-addon-list">
                    { blocks.map( block => {
                      return (
                          <AddonItem key={block.id} block={block}/>
                      )
                    })}
                  </div>
                </Fragment>
              )
            })}
          </Fragment>
    );
  }
}


export default compose(
  withSelect( select => {
    let {getDefaultAddonList} = select(); 
    return {
      addonList: getDefaultAddonList()
    }
  })
)(AddonList);