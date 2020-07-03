import React, { useEffect, useState, useRef } from "react";
import {
  SpacingComponent,
  Panel,
  SizeComponent,
  StyleComponent,
  PositionComponent,
  DisplayComponent,
  TypographyComponent,
  BackgroundComponent,
  TransformComponent,
} from "style-blocks";

const StylePanel = (props) => {
  let { styleState, addonId, setCssAttributes, computeStyle, fonts } = props;

  useEffect(() => {
    if (addonId !== null) {
      computeStyle();
    }
  }, [addonId]);

  const onUpdateStyleAttributes = (attributes, key) => {
    // console.log("attr", attributes);
    setCssAttributes(attributes, key);
  };
  const { spacing, size, backgrounds, style: styleProps, position, display, typography } = styleState;

  return (
    <div className="editor-x-style-panel-wrap">
      <Panel icon="x-icon-spacing" title="Spacing">
        <SpacingComponent
          style={spacing}
          addonId={addonId}
          setCssAttributes={(attributes) => onUpdateStyleAttributes(attributes, "spacing")}
        />
      </Panel>
      <Panel icon="x-icon-size" title="Size">
        <SizeComponent
          style={size}
          addonId={addonId}
          setCssAttributes={(attributes) => onUpdateStyleAttributes(attributes, "size")}
        />
      </Panel>
      <Panel icon="x-icon-background" title="Background">
        <BackgroundComponent
          style={backgrounds}
          addonId={addonId}
          setCssAttributes={(attributes) => onUpdateStyleAttributes(attributes, "backgrounds")}
        />
      </Panel>
      <Panel icon="x-icon-style" title="Style">
        <StyleComponent
          style={styleProps}
          addonId={addonId}
          setCssAttributes={(attributes) => onUpdateStyleAttributes(attributes, "style")}
        />
      </Panel>
      <Panel icon="x-icon-position" title="Position">
        <PositionComponent
          style={position}
          addonId={addonId}
          setCssAttributes={(attributes) => onUpdateStyleAttributes(attributes, "position")}
        />
      </Panel>
      <Panel icon="x-icon-compositon" title="Display">
        <DisplayComponent
          style={display}
          addonId={addonId}
          setCssAttributes={(attributes) => onUpdateStyleAttributes(attributes, "display")}
        />
      </Panel>
      <Panel icon="x-icon-typography" title="Typography">
        <TypographyComponent
          style={typography}
          addonId={addonId}
          fonts={fonts}
          setCssAttributes={(attributes) => onUpdateStyleAttributes(attributes, "typography")}
        />
      </Panel>
      <Panel icon="x-icon-typography" title="Transform">
        <TransformComponent
          style={transform}
          addonId={addonId}
          setCssAttributes={(attributes) => this.onUpdateStyleAttributes(attributes, "transform")}
        />
      </Panel>

      {/* <ColorPickerContainer /> */}
    </div>
  );
};
export default StylePanel;
