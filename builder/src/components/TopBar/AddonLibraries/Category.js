import React, { Component } from "react";

export class Category extends Component {
  constructor() {
    super();
  }

  render() {
    const { category, categoryIcon, isActive } = this.props;
    return (
      <div
        ref={this.props.categoryRef}
        onClick={() => this.props.setCategory(category)}
        className={"editor-x-dropdown-item " + (isActive ? "active" : "")}
      >
        <div className="editor-x-dropdown-icons">
          {categoryIcon && (
            <i className={`${categoryIcon} editor-x-dropdown-category`}></i>
          )}
          <i className="fas fa-angle-down editor-x-dropdown-angle"></i>
        </div>
        {category.title}
      </div>
    );
  }
}

export default Category;
