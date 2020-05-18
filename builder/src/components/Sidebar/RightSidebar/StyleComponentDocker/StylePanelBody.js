import React from 'react'; 
import { withSelect, withDispatch } from 'store';
import { getElementComputedStyle, generateStyleState } from 'style-blocks'; 
import { compose } from '../../../compose';
import StylePanel from './StylePanel'; 

class StylePanelBody extends React.Component {

    constructor(props) {
        super(props)
        this.state = {}
        this.counter = 0;
        this.startComputedStyle = this.startComputedStyle.bind(this)
    }

    startComputedStyle() {

        const _doc = window.frames["sppb-editor-view"].document; 

        if (_doc) {

            let {addonId, setElementComputedStyle} = this.props;
            let addonElement = _doc.querySelector(`[data-id="${addonId}"]`)

            if (addonElement !== null ) {
                let {getAllCssProperties} = this.props;
                console.log("rendered")
                const styleGuide = getElementComputedStyle(addonElement, getAllCssProperties)

                setElementComputedStyle(styleGuide);

                this.counter = 0;
            } else if (this.counter < 3) {

                setTimeout(() => {
                    this.counter = this.counter+1;
                    this.startComputedStyle();
                }, 100)

            }
        }
    }

    updateComputedCssStyles(attributes) {
        let {addonId, updateComutedAttributes} = this.props;
        console.log("attribute: ", attributes)

        let options = {
            blockId: null, 
            addonId: addonId
        }
        updateComutedAttributes(attributes, options)
    }

    render(){
        console.log("changed")
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
    withSelect( (select, {addonStyleBlockIds })=> {
        const { getCSSProperties, getStyleStore} = select();
        let styleBlockIds =  addonStyleBlockIds;
        // let currentStyleBlockId = styleBlockIds.length ? styleBlockIds[styleBlockIds.length-1] : null;
        let getAllCssProperties = getCSSProperties(styleBlockIds);

        let styleStore = getStyleStore();
        let styleState = generateStyleState(styleStore); 

        return {
            styleBlockIds,
            getAllCssProperties, 
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
