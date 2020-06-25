import React, { Fragment } from "react";
import {
  SpacingComponent,
  Panel,
  SizeComponent,
  StyleComponent,
  PositionComponent,
  DisplayComponent,
} from "style-blocks";
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
    let { spacing, size, backgrounds, style: styleProps, position, display } = styleState;
    console.log("after change", display);
    return (
      <Fragment>
        <Panel icon="x-icon-spacing" title="Spacing">
          <SpacingComponent
            style={spacing}
            addonId={addonId}
            setCssAttributes={(attributes) => this.onUpdateStyleAttributes(attributes, "spacing")}
          />
        </Panel>
        <Panel icon="x-icon-size" title="Size">
          <SizeComponent
            style={size}
            addonId={addonId}
            setCssAttributes={(attributes) => this.onUpdateStyleAttributes(attributes, "size")}
          />
        </Panel>
        <Panel icon="x-icon-background" title="Background">
          <BackgroundComponent
            style={backgrounds}
            addonId={addonId}
            setCssAttributes={(attributes) => this.onUpdateStyleAttributes(attributes, "backgrounds")}
          />
        </Panel>
        <Panel icon="x-icon-style" title="Style">
          <StyleComponent
            style={styleProps}
            addonId={addonId}
            setCssAttributes={(attributes) => this.onUpdateStyleAttributes(attributes, "style")}
          />
        </Panel>
        <Panel icon="x-icon-position" title="Position">
          <PositionComponent
            style={position}
            addonId={addonId}
            setCssAttributes={(attributes) => this.onUpdateStyleAttributes(attributes, "position")}
          />
        </Panel>
        <Panel icon="x-icon-compositon" title="Display">
          <DisplayComponent
            style={display}
            addonId={addonId}
            setCssAttributes={(attributes) => this.onUpdateStyleAttributes(attributes, "display")}
          />
        </Panel>

        {/* <ColorPickerContainer /> */}
      </Fragment>
    );
  }
}
export default StylePanel;
