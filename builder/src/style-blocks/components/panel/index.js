import React, { Fragment } from "react";

export default class Panel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }
  handleClose(event) {
    event.preventDefault();
    this.setState({ ...this.state, isOpen: !this.state.isOpen });
  }

  render() {
    const { children, icon, title } = this.props;
    const { isOpen } = this.state;
    return (
      <Fragment>
        <div className="editor-x-panel-header">
          <span className={`editor-x-panel-header-left-icon ${icon}`}></span>
          <div className="editor-x-panel-header-right">
            <span className="editor-x-panel-header-title">{title}</span>
            {!isOpen && (
              <span className="editor-x-panel-changes">40 top B | 60 InL</span>
            )}
            <span
              className={`editor-x-panel-toggle-icon ${
                isOpen ? "fas fa-times" : "fas fa-plus"
              }`}
              onClick={this.handleClose.bind(this)}
            ></span>
          </div>
        </div>
        {isOpen && <div className="editor-x-panel-x-body">{children}</div>}
      </Fragment>
    );
  }
}
