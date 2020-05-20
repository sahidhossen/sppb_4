import React from "react";
import { SpacingComponent, Panel } from "style-blocks";

class StylePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addonId: null,
    };
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
    let { spacing } = styleState;

    return (
      <div className="style-panel">
        <Panel icon="fas fa-arrows-alt-v" title="Spacing">
          <SpacingComponent
            style={spacing}
            setCssAttributes={setCssAttributes}
          />
        </Panel>
      </div>
    );
  }
}
export default StylePanel;
