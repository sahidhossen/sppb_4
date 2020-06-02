import React from "react";
import RadioControl from "../../../elements/RadioControl";

class SpacingComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  onChange(type, event) {
    let name = event.target.name;
    let value = event.target.value;

    let { setCssAttributes, style } = this.props;
    let _value = style[name];
    if (type === "value") {
      _value.value = value;
    }
    if (type === "unit") {
      _value.unit = value;
    }

    setCssAttributes({ [name]: { ..._value } });

    // setCssAttributes({paddingLeft: {value, unit} })
  }
  handleSelect(selectedItem, name) {
  // console.log({selectedItem, name})
    // let { setAttributes } = this.props;
    // setAttributes({ [name]: selectedItem.name });
  }
  render() {
    let { setCssAttributes, style, attributes } = this.props;

    let { paddingLeft, paddingRight } = style;
    return (
      <div className="editor-x-spacing-panel">
        {/* <input className="editor-x-spacing-value" type="text" value={paddingLeft.value} onChange={this.onChange.bind(this, 'value')} name="paddingLeft" />
        <input className="editor-x-spacing-value" type="text" value={paddingLeft.unit} onChange={this.onChange.bind(this, 'unit')} name="paddingLeft" /> */}
        <RadioControl
          activeClass="editor-x-active-item"
          // value=""
          value="item1"
          onSelect={(selectedItem) =>
            this.handleSelect(selectedItem, "background_type_tab")
          }
          items={[
            {
              name: "item1",
              title: <i className="fas fa-sort-amount-up"></i>,
              className: "item-one editor-x-tab-border-right",
              // icon: "fas fa-magic",
            },
            {
              name: "item2",
              title: <i className="fas fa-sort-amount-down-alt"></i>,
              className: "item-two editor-x-tab-border-right",
            },
            {
              name: "item3",
              title: <i className="fas fa-sort-amount-up"></i>,
              className: "item-three",
            },
          ]}
        />
        <div className="editor-x-spacing-wrap">
          <div className="editor-x-margin-left">
            <input
              className="editor-x-spacing-value"
              type="number"
              name=""
              min="0"
              max="100"
              value="40"
            />
            <span className="fas fa-link editor-x-link-icon"></span>
          </div>
          <div className="editor-x-margin-top">
            <input
              className="editor-x-spacing-value"
              type="number"
              name=""
              min="0"
              max="100"
              value="40"
            />
            <p className="editor-x-margin-text">M</p>
            <span className="fas fa-link editor-x-link-icon"></span>
          </div>
          <div className="editor-x-margin-bottom">
            <input
              className="editor-x-spacing-value"
              type="number"
              name=""
              min="0"
              max="100"
              value="0"
            />
            <span className="fas fa-link editor-x-link-icon"></span>
          </div>
          <div className="editor-x-margin-right">
            <input
              className="editor-x-spacing-value"
              type="number"
              name=""
              min="0"
              max="100"
              value="60"
            />
            <span className="fas fa-link editor-x-link-icon"></span>
          </div>
          <div className="editor-x-padding-wrap">
            <div className="editor-x-padding-left">
              <input
                className="editor-x-spacing-value"
                type="number"
                name=""
                min="0"
                max="100"
                value="40"
              />
              <span className="fas fa-link editor-x-link-icon"></span>
            </div>
            <div className="editor-x-padding-top">
              <input
                className="editor-x-spacing-value"
                type="number"
                name=""
                min="0"
                max="100"
                value="40"
              />
              <span className="fas fa-link editor-x-link-icon"></span>
            </div>
            <p className="editor-x-padding-text">P</p>
            <div className="editor-x-padding-bottom">
              <input
                className="editor-x-spacing-value"
                type="number"
                name=""
                min="0"
                max="100"
                value="0"
              />
              <span className="fas fa-link editor-x-link-icon"></span>
            </div>
            <div className="editor-x-padding-right">
              <input
                className="editor-x-spacing-value"
                type="number"
                name=""
                min="0"
                max="100"
                value="0"
              />
              <span className="fas fa-link editor-x-link-icon"></span>
            </div>
            <p className="editor-x-spacing-bottom-text">B</p>
          </div>
        </div>
        <RadioControl
          activeClass="editor-x-active-item"
          // value=""
          value="item1"
          onSelect={(selectedItem) =>
            this.handleSelect(selectedItem, "background_type_tab")
          }
          items={[
            {
              name: "item1",
              title: "PX",
              className: "item-one editor-x-tab-border-right",
              // icon: "fas fa-magic",
            },
            {
              name: "item2",
              title: "%",
              className: "item-two editor-x-tab-border-right",
            },
            {
              name: "item3",
              title: "EM",
              className: "item-three",
            },
            {
              name: "item4",
              title: "VW",
              className: "item-three",
            },
            {
              name: "item5",
              title: "VH",
              className: "item-three",
            },
            {
              name: "item6",
              title: "AUTO",
              className: "item-three",
            },
          ]}
        />
      </div>
    );
  }
}
export default SpacingComponent;
