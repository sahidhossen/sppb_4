
import { defaultComponentValues } from './default-components-value';

export const generateStyleState = (styleStore) => {
    let componentContextValue = {...defaultComponentValues};
    Object.keys(defaultComponentValues).map( componentKey => {
        let currentContextValue = componentContextValue[componentKey];
            componentContextValue[componentKey] = {...currentContextValue, ...updateFieldValue(styleStore, currentContextValue)} 
    })
    return componentContextValue;
}

const updateFieldValue = (styleStore, fields) => {
    const contextFields = {}
    Object.keys(fields).map( fieldName => {
        let fieldValue = styleStore[fieldName];
        contextFields[fieldName] = getValueAndUnit(fieldValue, fields[fieldName]);
    })
    return contextFields;
}

const getValueAndUnit = (fieldOpts, initValue) => {
    let { local, browser, placeholder } = fieldOpts;
    let propertyValue = initValue.value; 

    if (local.value && local.value !== null) {
        propertyValue = {...propertyValue, value: local.value }
    } else if( browser.value && browser.value !== null && (initValue.origin && initValue.origin !== 'default') ) {
        propertyValue = {...propertyValue, value: browser.value }
    } else {
        propertyValue = {...propertyValue, value: fieldOpts.default.value }
    }

    if (local.unit && local.unit !== null) {
        propertyValue = {...propertyValue, unit: local.unit }
    } else if( browser.unit && browser.unit !== null && (initValue.origin && initValue.origin !== 'default') ) {
        propertyValue = {...propertyValue, unit: browser.unit }
    } else {
        propertyValue = {...propertyValue, unit: fieldOpts.default.unit }
    }

    initValue = {...initValue, value: propertyValue }

    return initValue;
}