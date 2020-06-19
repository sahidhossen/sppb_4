import React, { Fragment } from "react";
import { SpacingComponent, Panel, SizeComponent, StyleComponent, PositionComponent } from "style-blocks";
import { BackgroundComponent } from "../../../../style-blocks";

class StylePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addonId: null,
    };
    this.onUpdateStyleAttributes = this.onUpdateStyleAttributes.bind(this);
  }

  static getDerivedStateFromProps(prevProps, state) {
    const { addonId, computeStyle } = prevProps;
    if (prevProps.addonId !== state.addonId) {
      computeStyle();
      return { addonId };
    }
    return state;
  }

  onUpdateStyleAttributes(attributes, key) {
    let { setCssAttributes } = this.props;
    // console.log("attr", attributes);
    setCssAttributes(attributes, key);
  }

  render() {
    let { styleState, addonId } = this.props;
    let { spacing, size, backgrounds, style: styleProps, position } = styleState;
    return (
      <Fragment>
        <Panel icon="fas fa-arrows-alt-v" title="Spacing">
          <SpacingComponent
            style={spacing}
            addonId={addonId}
            setCssAttributes={(attributes) => this.onUpdateStyleAttributes(attributes, "spacing")}
          />
        </Panel>
        <Panel icon="fas fa-arrows-alt-v" title="Size">
          <SizeComponent
            style={size}
            addonId={addonId}
            setCssAttributes={(attributes) => this.onUpdateStyleAttributes(attributes, "size")}
          />
        </Panel>
        <Panel icon="fas fa-arrows-alt-v" title="Background">
          <BackgroundComponent
            style={backgrounds}
            addonId={addonId}
            setCssAttributes={(attributes) => this.onUpdateStyleAttributes(attributes, "backgrounds")}
          />
        </Panel>
        <Panel icon="fas fa-arrows-alt-v" title="Style">
          <StyleComponent
            style={styleProps}
            addonId={addonId}
            setCssAttributes={(attributes) => this.onUpdateStyleAttributes(attributes, "style")}
          />
        </Panel>
        <Panel icon="fas fa-arrows-alt-v" title="Positioning">
          <PositionComponent
            style={position}
            addonId={addonId}
            setCssAttributes={(attributes) => this.onUpdateStyleAttributes(attributes, "position")}
          />
        </Panel>

        {/* <ColorPickerContainer /> */}
      </Fragment>
    );
  }
}
export default StylePanel;
