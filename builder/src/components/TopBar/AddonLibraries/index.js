import React, { Fragment } from "react";
import { compose } from "../../compose";
import { withSelect, withDispatch } from "store";
import Category from "./Category";
import DropDownView from "./DropDownView";
import SppbPortal from "../../sppbportal/SppbPortal";
import { createRef } from "react";

class AddonLibraries extends React.Component {
  constructor() {
    super();
    this.state = {
      showDropDown: false,
      selectedCategory: null,
    };
    this.categoryRef = createRef();
  }
  toggleDropDown(category) {
    if (this.state.selectedCategory === category) {
      this.setState((state) => ({
        ...state,
        showDropDown: !this.state.showDropDown,
      }));
    } else if (this.state.selectedCategory === null) {
      this.setState((state) => ({
        ...state,
        selectedCategory: category,
        showDropDown: !this.state.showDropDown,
      }));
    } else {
      this.setState((state) => ({
        ...state,
        selectedCategory: category,
        showDropDown: !this.state.showDropDown ? true : this.state.showDropDown,
      }));
    }
  }
  renderLibarayList() {
    const categories = Object.keys(this.props.addonListCategory);
    return categories.map((category) => (
      <Category
        categoryRef={this.categoryRef}
        toggleDropDown={this.toggleDropDown.bind(this)}
        key={category}
        category={this.props.addonListCategory[category]}
        name={category}
      />
    ));
  }
  render() {
    const { showDropDown } = this.state;
    return (
      <div className="sppb-topbar-middle">
        {this.renderLibarayList()}
        {showDropDown && (
          <SppbPortal>
            <DropDownView
              category={this.state.selectedCategory}
              categoryRef={this.categoryRef}
            />
          </SppbPortal>
        )}
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
      recent: {
        icon: "fas fa-history"
      },
      addon: {
        icon: "fas fa-bolt"
      },
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
])(AddonLibraries);
