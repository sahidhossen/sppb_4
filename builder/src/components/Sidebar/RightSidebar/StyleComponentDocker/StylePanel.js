import React, { Fragment } from "react";
import {
  SpacingComponent,
  Panel,
  SizeComponent,
  StyleComponent,
} from "style-blocks";
import ColorPickerContainer from "../../../../elements/ColorPicker/ColorPickerContainer";

class StylePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addonId: null,
    };
  }

  handleChange(event) {
    addonId: null;
  }

  static getDerivedStateFromProps(prevProps, state) {
    const { addonId, computeStyle } = prevProps;
    if (prevProps.addonId !== state.addonId) {
      computeStyle();
      return { addonId };
    }
    return state;
  }

  render() {
    let { styleState, setCssAttributes } = this.props;
    let { spacing, size } = styleState;
    return (
      <Fragment>
        <Panel icon="fas fa-arrows-alt-v" title="Spacing">
          <SpacingComponent
            style={spacing}
            setCssAttributes={setCssAttributes}
          />
        </Panel>
        <Panel icon="fas fa-arrows-alt-v" title="Size">
          <SizeComponent
            style={size}
            setCssAttributes={setCssAttributes}
          />
        </Panel>

        <ColorPickerContainer />
      </Fragment>
    );
  }
}
export default StylePanel;
