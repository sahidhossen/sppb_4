import React from "react";

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
    console.log("value: ", _value);
    setCssAttributes({ [name]: { ..._value } });

    // setCssAttributes({paddingLeft: {value, unit} })
  }

  render() {
    let { setCssAttributes, style } = this.props;
    let { paddingLeft, paddingRight } = style;
    console.log("spacing: ", style);
    return (
      <div className="editor-x-spacing-panel">
        {/*<input className="editor-x-spacing-value" type="text" value={paddingLeft.value} onChange={this.onChange.bind(this, 'value')} name="paddingLeft" />
        <input className="editor-x-spacing-value" type="text" value={paddingLeft.unit} onChange={this.onChange.bind(this, 'unit')} name="paddingLeft" />*/}
        <p className="editor-x-spacing-panel-title">Spacing</p>
        <div className="editor-x-spacing-wrap">
          <div className="editor-x-margin-left">
            <input className="editor-x-spacing-value" type="number" name="" min="0" max="100" value="40" />
            <span class="fas fa-link editor-x-link-icon"></span>
          </div>
          <div className="editor-x-margin-top">
            <input className="editor-x-spacing-value" type="number" name="" min="0" max="100" value="40" />
            <p className="editor-x-margin-text">M</p>
            <span class="fas fa-link editor-x-link-icon"></span>
          </div>
          <div className="editor-x-margin-bottom">
            <input className="editor-x-spacing-value" type="number" name="" min="0" max="100" value="0" />
            <span class="fas fa-link editor-x-link-icon"></span>
          </div>
          <div className="editor-x-margin-right">
            <input className="editor-x-spacing-value" type="number" name="" min="0" max="100" value="60" />
            <span class="fas fa-link editor-x-link-icon"></span>
          </div>
          <div className="editor-x-padding-wrap">
            <div className="editor-x-padding-left">
              <input className="editor-x-spacing-value" type="number" name="" min="0" max="100" value="40" />
              <span class="fas fa-link editor-x-link-icon"></span>
            </div>
            <div className="editor-x-padding-top">
              <input className="editor-x-spacing-value" type="number" name="" min="0" max="100" value="40" />
              <span class="fas fa-link editor-x-link-icon"></span>
            </div>
            <p className="editor-x-padding-text">P</p>
            <div className="editor-x-padding-bottom">
              <input className="editor-x-spacing-value" type="number" name="" min="0" max="100" value="0" />
              <span class="fas fa-link editor-x-link-icon"></span>
            </div>
            <div className="editor-x-padding-right">
              <input className="editor-x-spacing-value" type="number" name="" min="0" max="100" value="0" />
              <span class="fas fa-link editor-x-link-icon"></span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default SpacingComponent;
