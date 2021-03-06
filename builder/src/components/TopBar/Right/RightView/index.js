import React, { Fragment } from "react";
import { compose } from "../../../compose";
import { withSelect } from "store";
import List from "./List";
import EditorXPortal from "../../../portal";

class RightView extends React.Component {
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
    let { viewContextList } = this.props;

    return (
      <Fragment>
        <div
          className="sppb-tobbar-right-view"
          ref={(ref) => {
            this.button = ref;
          }}
          onClick={this.openList.bind(this)}
        >
          <i className="x-icon-slider"></i>
          <span className="x-icon-chevron-down editor-x-dropdown-angle"></span>
          <span className="editor-x-context-text">View</span>
        </div>
        {this.state.isList && (
          <EditorXPortal>
            <List
              reset={this.reset.bind(this)}
              event={this.state.event}
              target={this.button}
              viewContextList={viewContextList}
            />
          </EditorXPortal>
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
])(RightView);
