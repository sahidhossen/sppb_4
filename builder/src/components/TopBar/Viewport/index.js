import React, { Fragment } from "react";
import { compose } from "../../compose";
import { withSelect, withDispatch } from "store";
import ViewportList from "./ViewportList";
import EditorXPortal from "../../portal/EditorXPortal";

class Viewport extends React.Component {
  constructor() {
    super();
    this.state = {
      isList: false,
      event: null,
    };
  }
  openViewportList(event) {
    event.persist();
    this.setState({ isList: true, event });
  }
  reset() {
    this.setState({ isList: false, event: null });
  }
  updateViewport(viewport) {
    this.props.updateViewport(viewport);
  }
  render() {
    let { viewport, viewports } = this.props;
    return (
      <Fragment>
        <div
          className="sppb-responsive-btn"
          ref={(ref) => {
            this.button = ref;
          }}
          onClick={this.openViewportList.bind(this)}
        >
          <i className={viewport.icon}></i>
          <span className="x-icon-chevron-down"></span>
          <span className="editor-x-responsive-text">Responsive</span>
        </div>
        {this.state.isList && (
          <EditorXPortal>
            <ViewportList
              reset={this.reset.bind(this)}
              event={this.state.event}
              target={this.button}
              update={this.props.updateViewport}
              viewports={this.props.viewports}
              activeViewport={this.props.viewport}
            />
          </EditorXPortal>
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
  withDispatch((dispatch) => {
    let { updateViewport } = dispatch();
    return {
      updateViewport(viewportName) {
        updateViewport(viewportName);
      },
    };
  }),
])(Viewport);
