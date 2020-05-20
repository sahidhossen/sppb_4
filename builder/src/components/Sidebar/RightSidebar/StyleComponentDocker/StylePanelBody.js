import React from 'react'; 
import { withSelect, withDispatch } from 'store';
import { getElementComputedStyle, generateStyleState, cssToObject, createMarkup } from 'style-blocks'; 
import { compose } from '../../../compose';
import StylePanel from './StylePanel'; 

class StylePanelBody extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            rule: {
                styles: {
                    paddingLeft: '0px'
                }
            }
        }
        this.counter = 0;
        this.startComputedStyle = this.startComputedStyle.bind(this)
    }

    startComputedStyle() {

        const _doc = window.frames["sppb-editor-view"].document; 

        if (_doc) {

            let { addonId, setElementComputedStyle } = this.props;
            let addonElement = _doc.querySelector(`[data-id="${addonId}"]`)

            if (addonElement !== null ) {
                let { localCssProperties } = this.props;
                
                const styleGuide = getElementComputedStyle(addonElement, localCssProperties)

                setElementComputedStyle(styleGuide);

                this.updateCssRules();

                this.counter = 0;
            } else if (this.counter < 3) {

                setTimeout(() => {
                    this.counter = this.counter+1;
                    this.startComputedStyle();
                }, 100)

            }
        }
    }

    updateCssRules() {
        let {cssBlock, viewport, selectedBlockId, pseudocode} = this.props; 
        // console.log("Viewport: ", viewport)
        let rule = {
            viewport: viewport.name,
            pseudocode: pseudocode || null,
            styleBlockId: selectedBlockId, 
            styles: {}
        }
        if (cssBlock) {
            let cssObject = cssToObject(cssBlock.variant[viewport.name]);
            rule.styles = cssObject
        }
        console.log("Generate Rule: ", rule)
        this.setState({rule})

    }

    updateComputedCssStyles(attributes) {
        let {addonId, updateComutedAttributes, selectedBlockId} = this.props;
        let { rule } = this.state;
        let { cssObject } = createMarkup(attributes);
            rule = {...rule, styleBlockId: selectedBlockId,  styles: {...rule.styles, ...cssObject} }

        let options = {
            blockId: selectedBlockId, 
            addonId: addonId,
            ...rule
        }
        updateComutedAttributes(attributes, options)
        this.setState({rule})
    }

    render(){
        console.log("changed", this.props.selectedBlockId)
        return (
            <div className="editor-x-style-panel-body sppb-sidebar-panel-body">
                
                    <StylePanel
                        styleBlockIds={this.props.addonStyleBlockIds}
                        addonId={this.props.addonId}
                        styleState={this.props.styleState}
                        computeStyle={this.startComputedStyle}
                        setCssAttributes={this.updateComputedCssStyles.bind(this)}
                    />
                
            </div>
        )
    }
}

export default compose(
    withSelect( (select, {addonStyleBlockIds, selectedBlockId })=> {
        const { getStyleStore, getCssBlock} = select();
        let styleStore = getStyleStore();
        let styleState = generateStyleState(styleStore); 

        return {
            styleBlockIds: addonStyleBlockIds,
            cssBlock: getCssBlock(selectedBlockId),
            styleState,
            styleStore
        }
    }), 
    withDispatch( dispatch => {
        let {setComputeStyle, updateComputedStyle} = dispatch(); 
        return {
            setElementComputedStyle(styleGuide) {
                setComputeStyle(styleGuide)
            }, 
            updateComutedAttributes(attributes, options){
                updateComputedStyle(attributes, options)
            }
        }
    })

)(StylePanelBody);
