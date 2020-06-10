import React, { Fragment } from "react";
import {
  SpacingComponent,
  Panel,
  SizeComponent,
  StyleComponent
} from "style-blocks"; 

import ColorPickerContainer from "../../../../elements/ColorPicker/ColorPickerContainer";

class StylePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addonId: null,
    };
    this.onUpdateStyleAttributes  = this.onUpdateStyleAttributes.bind(this)
  }

  static getDerivedStateFromProps(prevProps, state) {
    const { addonId, computeStyle } = prevProps;
    if (prevProps.addonId !== state.addonId) {
      computeStyle();
      return { addonId };
    }
    return state;
  }

  onUpdateStyleAttributes( attributes, key) {
    let { setCssAttributes } = this.props;
    setCssAttributes(attributes, key)
  }

  render() {
    let { styleState } = this.props;
    let { spacing, size } = styleState;
    return (
      <Fragment>
        <Panel icon="fas fa-arrows-alt-v" title="Spacing">
          <SpacingComponent
            style={spacing}
            setCssAttributes={(attributes) => this.onUpdateStyleAttributes(attributes, 'spacing') }
          />
        </Panel>
        <Panel icon="fas fa-arrows-alt-v" title="Size">
          <SizeComponent
            style={size}
            setCssAttributes={(attributes) => this.onUpdateStyleAttributes(attributes, 'size') }
          />
        </Panel>

        <ColorPickerContainer />
      </Fragment>
    );
  }
}
export default StylePanel;
