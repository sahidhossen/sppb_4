import React, { Fragment } from "react";
import { compose } from "../compose";
import { withSelect, withDispatch } from "store";
import SppbPortal from "../sppbportal/SppbPortal";
import List from "../TopBar/Right/RightView/List";
import PopoverSetting from "./PopoverSetting";

class AddonConfigTag extends React.Component {
  constructor() {
    super();
    this.state = {
      isList: false,
      event: null,
    };
  }
  openList(event) {
    event.persist();
    this.setState({ isList: true, event });
  }
  reset() {
    this.setState({ isList: false, event: null });
  }

  render() {
    let { viewport, viewports, viewContextList, addon, target } = this.props;
    console.log("here", this.state.isList);
    const targetRect = target && target.getBoundingClientRect();
    return (
      <Fragment>
        {target && (
          <div
            className="sppb-addon-tag"
            ref={(ref) => {
              this.button = ref;
            }}
            style={{
              top: `${targetRect.top + 90}px`,
              left: `${targetRect.left + 271}px`,
            }}
            onClick={this.openList.bind(this)}
          >
            <span>{addon.name}</span> <i className="fas fa-cog"></i>
          </div>
        )}
        {this.state.isList && (
          <SppbPortal className="popover">
            <PopoverSetting
              reset={this.reset.bind(this)}
              event={this.state.event}
              target={this.button}
              addon={addon}
            />
          </SppbPortal>
        )}
      </Fragment>
    );
  }
}

export default compose([
  withSelect((select) => {
    let { getMediaQueries, getActiveMediaQuery, getViewContextList } = select();
    return {
      viewports: getMediaQueries(),
      viewport: getActiveMediaQuery(),
      viewContextList: getViewContextList(),
    };
  }),
])(AddonConfigTag);
