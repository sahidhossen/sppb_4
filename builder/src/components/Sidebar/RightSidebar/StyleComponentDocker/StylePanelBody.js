import React, { Fragment } from "react";
import { withSelect, withDispatch } from "store";
import { compose } from "../../../compose";

import {
  getElementComputedStyle,
  generateStyleState,
  cssToObject,
  createMarkup,
  enqueueStyle,
  withStyleContext,
} from "style-blocks";
import StylePanel from "./StylePanel";

class StylePanelBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rule: {},
    };
    this.counter = 0;
    this.startComputedStyle = this.startComputedStyle.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    let { styleBlock, viewport } = this.props;
    if (styleBlock && prevProps.styleBlock !== styleBlock) {
      enqueueStyle(styleBlock, viewport.name);
    }
  }

  startComputedStyle() {
    const _doc = window.frames["sppb-editor-view"].document;

    if (_doc) {
      let { addonId } = this.props;
      let addonElement = _doc.querySelector(`[data-id="${addonId}"]`);

      if (addonElement !== null) {
        let { localCssProperties, initiateStyleState, setElementComputedStyle } = this.props;

        const styleGuide = getElementComputedStyle(addonElement, localCssProperties);

        setElementComputedStyle(styleGuide);

        let styleState = generateStyleState(styleGuide);

        let rule = this.updateCssRules(addonElement);
        initiateStyleState({ styleState, rule });

        this.counter = 0;
      } else if (this.counter < 3) {
        setTimeout(() => {
          this.counter = this.counter + 1;
          this.startComputedStyle();
        }, 100);
      }
    }
  }

  updateCssRules(addonElement) {
    let { styleBlock, viewport, selectedBlockId, pseudocode } = this.props;
    let rule = {
      viewport: viewport.name,
      pseudocode: pseudocode || null,
      styleBlockId: selectedBlockId,
      tagName: addonElement.nodeName,
      styles: {},
    };
    if (styleBlock) {
      let cssObject = cssToObject(styleBlock.variant[viewport.name]);
      rule.styles = cssObject;
    }
    return rule;
  }

  updateComputedCssStyles(attributes, componentKey) {
    let { addonId, updateComutedAttributes, updateStyleAttributes, selectedBlockId, rule } = this.props;

    let { cssObject } = createMarkup(attributes);
    rule = {
      ...rule,
      styleBlockId: selectedBlockId,
      styles: { ...rule.styles, ...cssObject },
    };

    let options = {
      blockId: selectedBlockId,
      addonId: addonId,
      ...rule,
    };

    let hasBlockId = selectedBlockId !== null;

    updateStyleAttributes(attributes, { rule, componentKey });

    updateComutedAttributes(attributes, options, hasBlockId);
  }

  render() {
    const { addonId, fonts, addonStyleBlockIds, styleState } = this.props;
    return (
      <Fragment>
        {addonId ? (
          <StylePanel
            addonId={addonId}
            fonts={fonts}
            styleBlockIds={addonStyleBlockIds}
            styleState={styleState}
            computeStyle={this.startComputedStyle}
            setCssAttributes={this.updateComputedCssStyles.bind(this)}
          />
        ) : (
          <div className="editor-x-empty-style-panel">
            <div className="editor-x-guid-for-style-panel">Select an element from canvas to active style panel</div>
          </div>
        )}
      </Fragment>
    );
  }
}

export default compose(
  withStyleContext(({ state, dispatch }) => {
    let { initiateStyleState, updateStyleAttributes } = dispatch();
    return {
      ...state,
      updateStyleAttributes(attributes, options) {
        updateStyleAttributes(attributes, options);
      },
      initiateStyleState(styleState) {
        initiateStyleState(styleState);
      },
    };
  }),
  withSelect((select, { addonStyleBlockIds, selectedBlockId }) => {
    const { getStyleBlock, getFonts } = select();
    return {
      styleBlockIds: addonStyleBlockIds,
      styleBlock: getStyleBlock(selectedBlockId),
      fonts: getFonts(),
    };
  }),
  withDispatch((dispatch) => {
    let { setComputeStyle, updateComputedStyle } = dispatch();
    return {
      setElementComputedStyle(styleGuide) {
        setComputeStyle(styleGuide);
      },
      updateComutedAttributes(attributes, options, isBatch) {
        updateComputedStyle(attributes, options, isBatch);
      },
    };
  })
)(StylePanelBody);
