import { select } from 'store';

let getStoreCssProperty = ( propertyName, type = 'default') => {
    const { getStyleStore } = select();
    const styleStore = getStyleStore();
    return styleStore[propertyName][type];
}

let getBrowserValue = (propertyName, type='browser') => {
    return getStoreCssProperty(propertyName, type);
}

export {
    getStoreCssProperty,
    getBrowserValue
}