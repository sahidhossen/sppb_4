import React, { Component } from "react";
import { compose } from "../../compose";
import { withSelect, withDispatch } from "store";
import { findDOMNode } from "react-dom";

export class DropDownView extends Component {
  constructor() {
    super();
    this.state = {
      categoryItemRect: null,
    };
  }
  componentDidMount() {
    const { categoryRef } = this.props;
    const categoryElement = findDOMNode(categoryRef.current);
    this.setState((state) => ({
      ...state,
      categoryItemRect: categoryElement.getBoundingClientRect(),
    }));
  }
  render() {
    const { categoryItemRect } = this.state;
    const { category } = this.props;
    const style = {
      position: "absolute",
      height: "100px",
      width: "100vw",
      backgroundColor: "var(--shark-dark)",
      color: "var(--pale-gray)",
      left: 0,
      top: `${
        categoryItemRect ? categoryItemRect.top + categoryItemRect.height : 0
      }px`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    };

    if (categoryItemRect && category === "addon") {
      console.log("addons", this.props.addonList);
    }

    return (
      <div style={style}>
        <h2>{category} DropDownView</h2>
      </div>
    );
  }
}
export default compose([
  withSelect((select) => {
    let {
      getMediaQueries,
      getActiveMediaQuery,
      getDefaultAddonList,
    } = select();
    let addonListCategory = {
      recent: {},
      addon: {},
    };
    return {
      addonListCategory,
      addonList: getDefaultAddonList(),
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
])(DropDownView);
