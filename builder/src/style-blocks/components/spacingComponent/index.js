import React from "react";
import RadioControl from "../../../elements/RadioControl";
import SpaceBox from "./spaceBox";

class SpacingComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paddingLock: "",
      marginLock: "", 
      active: ''
    };

    this.onPropertyChange = this.onPropertyChange.bind(this);
    this.onActiveSpaceBox = this.onActiveSpaceBox.bind(this);
    this.onUnitChange = this.onUnitChange.bind(this);
  }

  /**
   * Active property by on click
   * @param {String} name Property name
   */
  onActiveSpaceBox(name) {
    if (this.state.active !== name) {
      this.setState({ active: name })
    }
  }

  /**
   * Change the propeties of margin and padding when drag
   * @param {String} direction Direction of margin and padding drag
   * @param {String} name Name of the property
   * @param {String} value Value of the property when drag
   */
  onPropertyChange(direction, name, value) {
    let { marginLock, paddingLock, active } = this.state;
    let { setCssAttributes, style } = this.props;

    let valueSet = style[name].value;

    let opositeProp = "";

    if (marginLock === "V" && direction === "VM") {
      opositeProp = name === "marginLeft" ? "marginRight" : "marginLeft";
    } else if (marginLock === "H" && direction === "HM") {
      opositeProp = name === "marginTop" ? "marginBottom" : "marginTop";
    } else if (paddingLock === "V" && direction === "VP") {
      opositeProp = name === "paddingLeft" ? "paddingRight" : "paddingLeft";
    } else if (paddingLock === "H" && direction === "HP") {
      opositeProp = name === "paddingTop" ? "paddingBottom" : "paddingTop";
    }

    let properties = { [name]: { ...valueSet, value } };

    if (opositeProp !== "") {
      properties = {
        ...properties,
        [opositeProp]: { ...style[opositeProp].value, value }
      };
    }

    setCssAttributes({ ...properties });

    active = name; 
    if (this.state.active !== active) {
      this.setState({ active })
    }
    // setCssAttributes({[name]: {...valueSet, value } })
  }

  onUnitChange(value) {
    let { active } = this.state; 
    if (active !== '') { 
      let { style, setCssAttributes } = this.props; 
      let valueSet = {...style[active].unit}; 
      let unit = value.name;
      setCssAttributes({[active]: {...valueSet, unit } })
    }
  }

  onMarginLock(direction) {
    let { marginLock } = this.state;
    marginLock = marginLock === direction ? "" : direction;
    this.setState({ marginLock });
  }

  onPaddingLock(direction) {
    let { paddingLock } = this.state;
    paddingLock = paddingLock === direction ? "" : direction;
    this.setState({ paddingLock });
  }

  handleSelect(selectedItem, name) {
    // console.log({selectedItem, name})
    // let { setAttributes } = this.props;
    // setAttributes({ [name]: selectedItem.name });
  }
  render() {
    let { style } = this.props;
    let {
      paddingLeft,
      paddingRight,
      paddingTop,
      paddingBottom,
      marginLeft,
      marginRight,
      marginTop,
      marginBottom
    } = style;

    let { marginLock, paddingLock, active } = this.state;

    let selectedUnit = active ? style[active].value.unit : null;

    return (
      <div className="editor-x-spacing-panel">
        <RadioControl
          activeClass="editor-x-active-item"
          // value=""
          value="item1"
          onSelect={value => this.handleSelect(value, "background_type_tab") }
          items={[
            {
              name: "item1",
              title: <i className="fas fa-sort-amount-up"></i>,
              className: "item-one editor-x-tab-border-right"
              // icon: "fas fa-magic",
            },
            {
              name: "item2",
              title: <i className="fas fa-sort-amount-down-alt"></i>,
              className: "item-two editor-x-tab-border-right"
            },
            {
              name: "item3",
              title: <i className="fas fa-sort-amount-up"></i>,
              className: "item-three"
            }
          ]}
        />
        <div className="editor-x-spacing-wrap">
          <SpaceBox
            className="editor-x-margin-left"
            direction={"VL"} // V | H
            action="margin"
            isLocked={marginLock === "V"}
            isActive={active === 'marginLeft'}
            value={marginLeft ? marginLeft.value.value : 0}
            onClick={() => this.onActiveSpaceBox('marginLeft') }
            onDragChange={value =>
              this.onPropertyChange("VM", "marginLeft", value)
            }
          >
            <div className="editor-x-spacing-value">
              {marginLeft.value.value || 0}
            </div>
            <span
              className={`fas ${
                marginLock === "V" ? "fa-unlink" : "fa-link"
              } editor-x-link-icon`}
              onClick={() => this.onMarginLock("V")}
            ></span>
          </SpaceBox>

          <SpaceBox
            className="editor-x-margin-top"
            direction={"HT"} // V | H
            action="margin"
            isActive={active === 'marginTop'}
            isLocked={marginLock === "H"}
            value={marginTop ? marginTop.value.value : 0}
            onClick={() => this.onActiveSpaceBox('marginTop') }
            onDragChange={value =>
              this.onPropertyChange("HM", "marginTop", value)
            }
          >
            <div className="editor-x-spacing-value">{marginTop.value.value || 0}</div>
            <p className="editor-x-margin-text">M</p>
            <span
              className={`fas ${
                marginLock === "H" ? "fa-unlink" : "fa-link"
              } editor-x-link-icon`}
              onClick={() => this.onMarginLock("H")}
            ></span>
          </SpaceBox>

          <SpaceBox
            className="editor-x-margin-bottom"
            direction={"HB"} // V | H
            action="margin"
            isActive={active === 'marginBottom'}
            isLocked={marginLock === "H"}
            value={marginBottom ? marginBottom.value.value : 0}
            onClick={() => this.onActiveSpaceBox('marginBottom') }
            onDragChange={value =>
              this.onPropertyChange("HM", "marginBottom", value)
            }
          >
            <div className="editor-x-spacing-value">
              {marginBottom.value.value || 0}
            </div>
            <span
              className={`fas ${
                marginLock === "H" ? "fa-unlink" : "fa-link"
              } editor-x-link-icon`}
              onClick={() => this.onMarginLock("H")}
            ></span>
          </SpaceBox>

          <SpaceBox
            className="editor-x-margin-right"
            direction={"VR"} // V | H
            action="margin"
            isActive={active === 'marginRight'}
            isLocked={marginLock === "V"}
            value={marginRight ? marginRight.value.value : 0}
            onClick={() => this.onActiveSpaceBox('marginRight') }
            onDragChange={value =>
              this.onPropertyChange("VM", "marginRight", value)
            }
          >
            <div className="editor-x-spacing-value">
              {marginRight.value.value || 0}
            </div>
            <span
              className={`fas ${
                marginLock === "V" ? "fa-unlink" : "fa-link"
              } editor-x-link-icon`}
              onClick={() => this.onMarginLock("V")}
            ></span>
          </SpaceBox>

          <div className="editor-x-padding-wrap">
            <SpaceBox
              className="editor-x-padding-left"
              direction={"VL"} // V | H
              action="padding"
              isActive={active === 'paddingLeft'}
              isLocked={paddingLock === "V"}
              value={paddingLeft ? paddingLeft.value.value : 0}
              onClick={() => this.onActiveSpaceBox('paddingLeft') }
              onDragChange={value =>
                this.onPropertyChange("VP", "paddingLeft", value)
              }
            >
              <div className="editor-x-spacing-value">
                {paddingLeft.value.value || 0}
              </div>
              <span
                className={`fas ${
                  paddingLock === "V" ? "fa-unlink" : "fa-link"
                } editor-x-link-icon`}
                onClick={() => this.onPaddingLock("V")}
              ></span>
            </SpaceBox>
            <SpaceBox
              className="editor-x-padding-top"
              direction={"HT"} // V | H
              action="padding"
              isActive={active === 'paddingTop'}
              isLocked={paddingLock === "H"}
              value={paddingTop ? paddingTop.value.value : 0}
              onClick={() => this.onActiveSpaceBox('paddingTop') }
              onDragChange={value =>
                this.onPropertyChange("HP", "paddingTop", value)
              }
            >
              <div className="editor-x-spacing-value">
                {paddingTop.value.value || 0}
              </div>
              <span
                className={`fas ${
                  paddingLock === "H" ? "fa-unlink" : "fa-link"
                } editor-x-link-icon`}
                onClick={() => this.onPaddingLock("H")}
              ></span>
            </SpaceBox>
            <p className="editor-x-padding-text">P</p>
            <SpaceBox
              className="editor-x-padding-bottom"
              direction={"HB"} // V | H
              action="padding"
              isActive={active === 'paddingBottom'}
              isLocked={paddingLock === "H"}
              value={paddingBottom ? paddingBottom.value.value : 0}
              onClick={() => this.onActiveSpaceBox('paddingBottom') }
              onDragChange={value =>
                this.onPropertyChange("HP", "paddingBottom", value)
              }
            >
              <div className="editor-x-spacing-value">
                {paddingBottom.value.value || 0}
              </div>
              <span
                className={`fas ${
                  paddingLock === "H" ? "fa-unlink" : "fa-link"
                } editor-x-link-icon`}
                onClick={() => this.onPaddingLock("H")}
              ></span>
            </SpaceBox>
            <SpaceBox
              className="editor-x-padding-right"
              direction={"VR"} // V | H
              action="padding"
              isActive={active === 'paddingRight'}
              isLocked={paddingLock === "V"}
              value={paddingRight ? paddingRight.value.value : 0}
              onClick={() => this.onActiveSpaceBox('paddingRight') }
              onDragChange={value =>
                this.onPropertyChange("VP", "paddingRight", value)
              }
            >
              <div className="editor-x-spacing-value">
                {paddingRight.value.value || 0}
              </div>
              <span
                className={`fas ${
                  paddingLock === "V" ? "fa-unlink" : "fa-link"
                } editor-x-link-icon`}
                onClick={() => this.onPaddingLock("V")}
              ></span>
            </SpaceBox>
            <p className="editor-x-spacing-bottom-text">B</p>
          </div>
        </div>
        <RadioControl
          activeClass="editor-x-active-item"
          value={selectedUnit}
          disabled={active === ''}
          onSelect={ value => this.onUnitChange(value) }
          items={[
            {
              name: "px",
              title: "PX",
              className: "item-one editor-x-tab-border-right"
              // icon: "fas fa-magic",
            },
            {
              name: "%",
              title: "%",
              className: "item-two editor-x-tab-border-right"
            },
            {
              name: "em",
              title: "EM",
              className: "item-three"
            },
            {
              name: "vw",
              title: "VW",
              className: "item-three"
            },
            {
              name: "vh",
              title: "VH",
              className: "item-three"
            },
            {
              name: "auto",
              title: "AUTO",
              className: "item-three"
            }
          ]}
        />
      </div>
    );
  }
}
export default SpacingComponent;
