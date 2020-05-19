import { revisedRandId } from "./utils";
import {createMarkup} from 'style-blocks';

/**
 * 
 * @param {Object} attributes List of attribute and their units
 * @param {Object} options css depedency options {Exmp: viewport, className...}
 */
export const createStyleBlock = (attributes, options) => {
    const {className, viewport} = options;
    const cssStyle = createCssMarkup(attributes)
    return {
        id: revisedRandId(), 
        type: 'class', 
        className, 
        styless: cssStyle,
        variant: {[viewport]: cssStyle }
    }
}

/**
 * Create style map object
 * @param {Object} attributes List of css Attributes
 * @param {Object} options css depedency options {Exmp: viewport, className...}
 * @param {String} styleBlockId Style Block ID
 */
export const getStyleMap = (attributes, options) => {
    let properties = {}
    Object.keys(attributes).map( key =>{ properties[key] = true })
    return {
        [options.viewport]: {...properties}
    }
}



export const createCssMarkup = (attributes, cssString = '' ) => {
    let cssMarkup = createMarkup(attributes);
    if (cssString === '') { 
        return cssMarkup
    }; 
    // replace css rules to existing css string
    

}