import React, { Component } from "react";

export class Category extends Component {
  constructor() {
    super();
  }

  render() {
    const { category } = this.props;
    const style = {
      padding: "10px",
      cursor: "pointer",
    };
    return (
      <span
        ref={this.props.categoryRef}
        style={style}
        onClick={() => this.props.setCategory(category)}
      >
        {category.title}
      </span>
    );
  }
}

export default Category;
