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
        style={style}
        onClick={() => this.props.setCategory(category)}
      >
        {category.title}
      </div>
    );
  }
}

export default Category;
