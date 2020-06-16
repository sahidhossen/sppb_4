import React, { Component, Fragment } from "react";
import BackgroundItem from "./BackgroundItem";

export class BackgroundComponent extends Component {
  render() {
    const {
      style: { backgroundColor, backgroundImages },
    } = this.props;

    return (
      <Fragment>
        <BackgroundItem type="solid" {...backgroundColor} />
        {backgroundImages.value.map(({ type, ...restProps }, index) => (
          <BackgroundItem type={type} {...restProps} key={index} />
        ))}
        <button className="editor-x-add-background">Add New Color</button>
      </Fragment>
    );
  }
}

export default BackgroundComponent;
