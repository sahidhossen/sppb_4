import React, { Fragment } from "react";
import { compose } from "../../../compose";
import { withSelect, withDispatch } from "store";
import List from "./List";
import SppbPortal from "../../../sppbportal/SppbPortal";

class ListItem extends React.Component {
  constructor() {
    super();
    this.state = {
      isList: false,
      event: null,
    };
  }
  openList(event) {
    const { hasSubList } = this.props;
    if (!hasSubList) return;

    event.persist();
    this.setState({ isList: true, event });
  }
  reset() {
    this.setState({ isList: false, event: null });
  }

  render() {
    const { viewport, hasSubList } = this.props;
    return (
      <Fragment>
        <li
          key={name}
          ref={(ref) => {
            this.button = ref;
          }}
          onClick={this.openList.bind(this)}
        >
          <div className="sppb-viewport-icon">
            <i className={viewport.icon}></i>
          </div>
          <div className="sppb-viewport-title">
            <h3 className="sppb-title">{viewport.title} </h3>
            <span className="sppb-notes">{viewport.value} and down</span>
            {hasSubList && (
              <div className="sppb-nested-icon">
                <i className="fas fa-arrow-right"></i>
              </div>
            )}
          </div>
        </li>
        {this.state.isList && (
          <SppbPortal className="popover">
            <List
              isSubList={hasSubList}
              reset={this.reset.bind(this)}
              event={this.state.event}
              target={this.button}
              viewports={this.props.viewports}
            />
          </SppbPortal>
        )}
      </Fragment>
    );
  }
}

export default compose([
  withSelect((select) => {
    let { getMediaQueries, getActiveMediaQuery } = select();
    return {
      viewports: getMediaQueries(),
      viewport: getActiveMediaQuery(),
    };
  }),
])(ListItem);
