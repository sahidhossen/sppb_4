import React, { Fragment } from "react";
import { compose } from "../../compose";
import { withSelect, withDispatch } from "store";
import Category from "./Category";
import DropDownView from "./DropDownView";
import EditorXPortal from "../../portal";
import { createRef } from "react";
import { blockListForTools } from "../../../lib/utils";
class AddonLibraries extends React.Component {
  constructor() {
    super();
    this.state = {
      showDropDown: false,
      selectedCategory: null,
    };
    this.categoryRef = createRef();
  }
  toggleDropdown() {
    this.setState((state) => ({
      ...state,
      showDropDown: !this.state.showDropDown,
    }));
  }
  setCategory(category) {
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
    const { addonListCategory } = this.props;
    const { showDropDown, selectedCategory } = this.state;
    const categories = Object.keys(addonListCategory);
    const categoryIcons = {
      text: "x-icon-text",
      layouts: "x-icon-layouts",
      containers: "x-icon-containers",
    };
    return categories.map((category) => (
      <Category
        categoryRef={this.categoryRef}
        setCategory={this.setCategory.bind(this)}
        key={category}
        category={addonListCategory[category]}
        categoryIcon={categoryIcons[category]}
        isActive={showDropDown === true && selectedCategory.title === category}
      />
    ));
  }
  render() {
    const { showDropDown } = this.state;
    return (
      <div className="sppb-topbar-middle">
        {this.renderLibarayList()}
        {showDropDown && (
          <EditorXPortal>
            <DropDownView
              category={this.state.selectedCategory}
              categoryRef={this.categoryRef}
              toggleDropdown={this.toggleDropdown.bind(this)}
            />
          </EditorXPortal>
        )}
      </div>
    );
  }
}
export default compose([
  withSelect((select) => {
    let { getMediaQueries, getActiveMediaQuery, getDefaultAddonList } = select();
    let addonList = getDefaultAddonList();
    let addonListCategory = blockListForTools(addonList);
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
