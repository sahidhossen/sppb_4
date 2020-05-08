import React, { Component } from "react";

export class Category extends Component {
  constructor() {
    super();
  }

  render() {
    const { category: { icon }, name } = this.props;
    return (
      <div
        ref={this.props.categoryRef}
        onClick={() => this.props.toggleDropDown(name)}
        className="editor-x-dropdown-item"
      >
        <div className="editor-x-dropdown-icons">
          {icon && <i className={`${icon} editor-x-dropdown-category`}></i>}
          <i className="fas fa-angle-down editor-x-dropdown-angle"></i>
        </div>
        {name}
      </div>
    );
  }
}

export default Category;
