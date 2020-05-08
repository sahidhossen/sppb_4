import React, { Component } from "react";
import { compose } from "../../compose";
import { withSelect, withDispatch } from "store";
import { findDOMNode } from "react-dom";
import AddonItem from "./AddonItem";

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
    const { category, toggleDropdown } = this.props;
    const { list } = category;

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

    return (
      <div style={style}>
        {list.length > 0 &&
          list.map((addon) => (
            <AddonItem
              key={addon.title}
              block={addon}
              toggleDropdown={toggleDropdown}
            />
          ))}
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

    return {
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
