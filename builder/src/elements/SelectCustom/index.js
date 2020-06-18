import React from "react";
import Option from "./Option";
import SelectedItem from "./SelectedItem";

/**
 * Designing HTML5 select is painful so we are creating our own select element
 * We passed {defaultProps} for this function, check at the bottom of the function
 */
class SelectCustom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: "",
      addParentClass: false,
      translateTop: 0,
    };
  }

  getSelectedIndex(unit, options) {
    let index = "";
    if (!unit) return index;

    for (let i = 0; i < options.length; i++) {
      if (options[i].value === unit) {
        index = i;
        break;
      }
    }
    return index;
  }

  /**
   * Updating select option element CSS translate value
   * This function will fire with {onToggle} function
   */
  updateOptionTranslate() {
    const { options } = this.props;
    const { selectedItem } = this.state;

    //Taking default value index and selected value index, In initial load it will be same.
    const defaultIndex = options.findIndex((index) => index.selected === true);
    const selectedIndex = options.findIndex((index) => index === options[selectedItem]);

    //Selecting element by using React ref to calculate translate valu and to set in CSS translate
    const optionsParent = this.optionsParent;
    //Counting child element
    const numberOfChild = optionsParent.childElementCount;
    //Taking height of parent element
    const optionHeigth = optionsParent.clientHeight;
    //Calculating how much to translate
    const translateValue = optionHeigth / numberOfChild;

    this.setState({
      translateTop:
        this.state.translateTop === 0 && defaultIndex === selectedIndex
          ? translateValue * defaultIndex
          : translateValue * selectedIndex,
    });
  }

  /**
   * This function will fire onClick of select and open/close the options {div}
   */
  onToggle() {
    const { addParentClass } = this.state;

    this.updateOptionTranslate();

    this.setState({
      addParentClass: !addParentClass,
    });
  }

  /**
   * If user click outside of the option {div} it will close the options {div}
   */
  collapseOnOutsideClick() {
    this.setState({
      addParentClass: false,
    });
  }

  /**
   * This function is used to select option
   * @param {key} of the option item
   */
  selectOption(selection, value) {
    const { onSelectChange } = this.props;
    this.setState({
      selectedItem: selection,
    });
    onSelectChange(value);
  }

  render() {
    const { options, selectedIcon, styleTwo, className, value } = this.props;
    const { selectedItem, addParentClass, translateTop } = this.state;

    const selectedIndex = this.getSelectedIndex(value, options);

    return (
      <div
        className={`sppb-select-wrapper editor-x-form-controllers${styleTwo ? " sppb-select-custom-style-two" : ""}${
          className ? " " + className : ""
        }`}
        onClick={() => this.onToggle()}
      >
        <div
          className={`sppb-custom-select${addParentClass ? " sppb-options-open" : ""}`}
          tabIndex="0"
          onBlur={this.collapseOnOutsideClick.bind(this)}
        >
          <SelectedItem optionSelected={options[selectedIndex]} />

          <div
            className="sppb-custom-options"
            style={{
              transform: `translate(0, -${!styleTwo ? translateTop : "0"}px)`,
            }}
            ref={(optionsParent) => {
              this.optionsParent = optionsParent;
            }}
          >
            <Option
              options={options}
              selectedIcon={selectedIcon}
              selectedItem={selectedItem}
              styleTwo={styleTwo}
              selectOption={this.selectOption.bind(this)}
            />
          </div>
        </div>
      </div>
    );
  }
}

//Props will be taken from this Object if not passed on call component
SelectCustom.defaultProps = {
  options: [{ value: "Option Name" }, { value: "Option Name 2", selected: true }, { value: "Option Name 3" }],
  selectedIcon: "fas fa-check",
};
export default SelectCustom;
