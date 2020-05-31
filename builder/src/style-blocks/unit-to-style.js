const has_units = {
    height: true, 
    maxHeight: true,
    minHeight: true, 
    width: true,
    maxWidth: true,
    minWidth: true, 
    paddingLeft: true, 
    paddingRight: true, 
    paddingBottom: true, 
    paddingTop: true
}

export const hasUnit = (key) => has_units[key] || false;

const arrayFilter = arr => {
    let temp = [];
    for(let i of arr)
        i && temp.push(i); 
    return temp;
}

export const extractUnit = (key, value) => {

    let property = {value: null, unit: null};
    if(!value) {
        return property;
    }

    if (hasUnit(key)) {

        let extractor = arrayFilter(value.split(/(\d+)/)); 

        property.value = extractor[0] || null;
        property.unit = extractor[1] || null;

        return property;
    }
    return false;
}