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
    const { listItem, hasSubList } = this.props;
    return (
      <Fragment>
        <li
          key={name}
          ref={(ref) => {
            this.button = ref;
          }}
          onClick={this.openList.bind(this)}
          className={
            listItem.status ? "editor-x-context-menu-item-active" : false
          }
        >
          <div className="editor-x-context-menu-content-wrap">
            {listItem.status && (
              <i className="fas fa-check editor-x-context-menu-checkmark"></i>
            )}
            <div className="editor-x-context-menu-icon">
              <i className={listItem.icon}></i>
            </div>
            <div className="editor-x-context-menu-title-wrap">
              <span className="editor-x-context-menu-title">
                {listItem.title}{" "}
              </span>
              {/*<span className="sppb-viewport-notes">
                      {viewport.value} and down
                    </span>*/}
            </div>
            {hasSubList && (
              <div className="editor-x-context-menu-nested-icon">
                <i className="fas fa-caret-right"></i>
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
              viewContextList={this.props.viewContextList}
            />
          </SppbPortal>
        )}
      </Fragment>
    );
  }
}

export default compose([
  withSelect((select) => {
    let { getMediaQueries, getViewContextList } = select();
    return {
      viewports: getMediaQueries(),
      viewContextList: getViewContextList(),
    };
  }),
])(ListItem);
