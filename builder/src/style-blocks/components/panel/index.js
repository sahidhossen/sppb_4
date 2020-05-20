import React from "react";

export default class Panel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
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
      <div className="editor-x-panel">
        <div className="editor-x-panel-header">
          <span className={`header-left-icon ${icon}`}></span>
          <span className="header-title">{title}</span>
          {!isOpen && <span className="changes">40 top B | 60 InL</span>}
          <span
            className={`toggle-icon ${isOpen ? "fas fa-times" : "fas fa-plus"}`}
            onClick={this.handleClose.bind(this)}
          ></span>
        </div>
        {isOpen && <div className="panel-x-body">{children}</div>}
      </div>
    );
  }
}
