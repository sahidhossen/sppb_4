import { hasUnit, extractUnit } from './unit-to-style'; 

import styleState  from '../reducers/defaultStyle';

let differentProperties = {
    backgroundImages: 'backgroundImage', 
    fontColor: 'color', 
    filters: 'filter', 
    textShadows: 'textShadow', 
    transforms: 'transform', 
    transitions: 'transition',
};

export const getElementComputedStyle = (element, localProperties) => {
    let computedStyle = getComputedStyle(element);

    let defaultProperties = {...styleState}; 

    Object.keys(defaultProperties).map( cssKey => {
       
        let extenedKey = cssKey;
       
        if (differentProperties[extenedKey] && computedStyle[differentProperties[extenedKey]]){
            extenedKey = differentProperties[extenedKey]; 
        }

        let hasLocalProperty = localProperties[extenedKey] || null;

        let value = computedStyle[extenedKey];

        /**
         * I have property and propertyKey
         */

        let mountableValue = cssToLocalValue(cssKey, value)
        
        if (hasLocalProperty) {
            defaultProperties[cssKey] = {...defaultProperties[cssKey], local: {...mountableValue} }
        } else {
            defaultProperties[cssKey] = {...defaultProperties[cssKey], browser: {...mountableValue} }
        }
    })
    
    return defaultProperties;
    
}

const cssToLocalValue = (key, value) => {
    let nextProperty = { value:null, unit: null }
    if(key === 'backgroundColor') {
        nextProperty.value = value;
    }
    if(hasUnit(key)) {
        nextProperty = {...extractUnit(key, value) }
    }
    return nextProperty;
}