import React from "react";
import RadioControl from "../../../elements/RadioControl";
import SpaceBox from "./spaceBox";

class SpacingComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paddingLock: "",
      marginLock: ""
    };
    this.onPropertyChange = this.onPropertyChange.bind(this);
  }

  onPropertyChange(direction, name, value) {
    let { marginLock, paddingLock } = this.state;
    let { setCssAttributes, style } = this.props;

    let valueSet = style[name];

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
        [opositeProp]: { ...style[opositeProp], value }
      };
    }

    setCssAttributes({ ...properties });

    // setCssAttributes({[name]: {...valueSet, value } })
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

    let { marginLock, paddingLock } = this.state;
    
    return (
      <div className="editor-x-spacing-panel">
        {/* <input className="editor-x-spacing-value" type="text" value={paddingLeft.value} onChange={this.onChange.bind(this, 'value')} name="paddingLeft" />
        <input className="editor-x-spacing-value" type="text" value={paddingLeft.unit} onChange={this.onChange.bind(this, 'unit')} name="paddingLeft" /> */}
        <RadioControl
          activeClass="editor-x-active-item"
          // value=""
          value="item1"
          onSelect={selectedItem =>
            this.handleSelect(selectedItem, "background_type_tab")
          }
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
            value={marginLeft ? marginLeft.value : 0}
            onDragChange={value =>
              this.onPropertyChange("VM", "marginLeft", value)
            }
          >
            <div className="editor-x-spacing-value">
              {marginLeft.value || 0}
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
            value={marginTop ? marginTop.value : 0}
            onDragChange={value =>
              this.onPropertyChange("HM", "marginTop", value)
            }
          >
            <div className="editor-x-spacing-value">{marginTop.value || 0}</div>
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
            value={marginBottom ? marginBottom.value : 0}
            onDragChange={value =>
              this.onPropertyChange("HM", "marginBottom", value)
            }
          >
            <div className="editor-x-spacing-value">
              {marginBottom.value || 0}
            </div>
            <span
              className={`fas ${
                marginLock === "H" ? "fa-unlink" : "fa-link"
              } editor-x-link-icon`}
              onClick={() => this.onMarginLock("V")}
            ></span>
          </SpaceBox>

          <SpaceBox
            className="editor-x-margin-right"
            direction={"VR"} // V | H
            action="margin"
            value={marginRight ? marginRight.value : 0}
            onDragChange={value =>
              this.onPropertyChange("VM", "marginRight", value)
            }
          >
            <div className="editor-x-spacing-value">
              {marginRight.value || 0}
            </div>
            <span
              className={`fas ${
                marginLock === "V" ? "fa-unlink" : "fa-link"
              } editor-x-link-icon`}
              onClick={() => this.onMarginLock("H")}
            ></span>
          </SpaceBox>

          <div className="editor-x-padding-wrap">
            <SpaceBox
              className="editor-x-padding-left"
              direction={"VL"} // V | H
              action="padding"
              value={paddingLeft ? paddingLeft.value : 0}
              onDragChange={value =>
                this.onPropertyChange("VP", "paddingLeft", value)
              }
            >
              <div className="editor-x-spacing-value">
                {paddingLeft.value || 0}
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
              value={paddingTop ? paddingTop.value : 0}
              onDragChange={value =>
                this.onPropertyChange("HP", "paddingTop", value)
              }
            >
              <div className="editor-x-spacing-value">
                {paddingTop.value || 0}
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
              value={paddingBottom ? paddingBottom.value : 0}
              onDragChange={value =>
                this.onPropertyChange("HP", "paddingBottom", value)
              }
            >
              <div className="editor-x-spacing-value">
                {paddingBottom.value || 0}
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
              value={paddingRight ? paddingRight.value : 0}
              onDragChange={value =>
                this.onPropertyChange("VP", "paddingRight", value)
              }
            >
              <div className="editor-x-spacing-value">
                {paddingRight.value || 0}
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
          // value=""
          value="item1"
          onSelect={selectedItem =>
            this.handleSelect(selectedItem, "background_type_tab")
          }
          items={[
            {
              name: "item1",
              title: "PX",
              className: "item-one editor-x-tab-border-right"
              // icon: "fas fa-magic",
            },
            {
              name: "item2",
              title: "%",
              className: "item-two editor-x-tab-border-right"
            },
            {
              name: "item3",
              title: "EM",
              className: "item-three"
            },
            {
              name: "item4",
              title: "VW",
              className: "item-three"
            },
            {
              name: "item5",
              title: "VH",
              className: "item-three"
            },
            {
              name: "item6",
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
