import React, { Fragment } from "react";
import { SpacingComponent, Panel, SizeComponent, StyleComponent, positionComponent } from "style-blocks";
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
    setCssAttributes(attributes, key);
  }

  render() {
    let { styleState } = this.props;
    let { spacing, size, backgrounds, style: styleProps } = styleState;
    return (
      <Fragment>
        <Panel icon="fas fa-arrows-alt-v" title="Spacing">
          <SpacingComponent
            style={spacing}
            setCssAttributes={(attributes) => this.onUpdateStyleAttributes(attributes, "spacing")}
          />
        </Panel>
        <Panel icon="fas fa-arrows-alt-v" title="Size">
          <SizeComponent
            style={size}
            setCssAttributes={(attributes) => this.onUpdateStyleAttributes(attributes, "size")}
          />
        </Panel>
        <Panel icon="fas fa-arrows-alt-v" title="Background">
          <BackgroundComponent
            style={backgrounds}
            setCssAttributes={(attributes) => this.onUpdateStyleAttributes(attributes, "backgrounds")}
          />
        </Panel>
        <Panel icon="fas fa-arrows-alt-v" title="Style">
          <StyleComponent
            style={styleProps}
            setCssAttributes={(attributes) => this.onUpdateStyleAttributes(attributes, "style")}
          />
        </Panel>
        <Panel icon="fas fa-arrows-alt-v" title="Positioning">
          <positionComponent
          // style={styleProps}
          // setCssAttributes={(attributes) =>
          //   this.onUpdateStyleAttributes(attributes, "style")
          // }
          />
        </Panel>

        {/* <ColorPickerContainer /> */}
      </Fragment>
    );
  }
}
export default StylePanel;
