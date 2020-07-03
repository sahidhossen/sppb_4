import React from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { withSelect, withDispatch } from "store";
import { StyleBlockContextProvider } from "style-blocks";
import { compose } from "../../../compose";
import StylePanelHeader from "./StylePanelHeader";
import StylePanelBody from "./StylePanelBody";

class StyleComponentDocker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rule: {},
      rules: [],
      updateRule: this.updateRule,
      addRules: this.addRules,
    };
    this.updateRule = this.updateRule.bind(this);
    this.addRules = this.addRules.bind(this);
  }

  updateRule(value) {
    let { rule } = this.state;
    this.setState({ rule: { ...rule, value } });
  }

  addRules(nextRules) {
    let { rules } = this.state;
    this.setState({ rules: [...rules, nextRules] });
  }

  render() {
    let { addonId, addonStyleBlockIds } = this.props;
    return (
      <div className="sppb-docker-container sppb-style-component-docker">
        {/*<SidebarHeader className={"right-sidebar-header"}>
                    <div className="sppb-sidebar-icons">
                        <span className="sppb-sidebar-panel-icon">
                            <i className="fas fa-columns"></i>
                            <i className="fas fa-columns"></i>
                            <i className="fas fa-columns"></i>
                        </span>
                        <span className="sppb-drag-icon">
                            <i className="fas fa-braille"></i>
                        </span>
                    </div>
                </SidebarHeader>*/}
        <Scrollbars autoHide autoHideTimeout={500} autoHideDuration={200}>
          <div className="sppb-sidebar-panel">
            <div className="sppb-sidebar-panel-content">
              <StyleBlockContextProvider>
                <StylePanelHeader addonId={addonId} addonStyleBlockIds={addonStyleBlockIds} />
                <StylePanelBody {...this.props} />
              </StyleBlockContextProvider>
            </div>
          </div>
        </Scrollbars>
      </div>
    );
  }
}

export default compose(
  withSelect((select) => {
    const { selectedAddonId, getAddonStyleBlockIds, getCSSProperties, getActiveMediaQuery } = select();
    let addonId = selectedAddonId();
    let addonStyleBlockIds = getAddonStyleBlockIds(addonId);
    return {
      addonId,
      addonStyleBlockIds,
      viewport: getActiveMediaQuery(),
      localCssProperties: getCSSProperties(addonStyleBlockIds),
      selectedBlockId: addonStyleBlockIds.length ? addonStyleBlockIds[0] : null,
    };
  })
)(StyleComponentDocker);
