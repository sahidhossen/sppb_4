
import { defaultComponentValues } from './default-value';

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
        let value = fieldValue.local.value === null ? fieldValue.browser : fieldValue.local
            contextFields[fieldName] = {...value};
    })
    return contextFields;
}