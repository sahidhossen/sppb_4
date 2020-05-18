import hyphenate from 'hyphenate-style-name'; 

export const createMarkup = (attributes) => {
    const keys = Object.keys(attributes)
    if (!keys.length) return ''
    let i, len = keys.length
    let result = ''
  
    for (i = 0; i < len; i++) {
      const key = keys[i]
      const val = attributes[key]
      result += hyphenate(key) + ':' + addUnit(val) + ';'
    }
  
    return result
  }

const addUnit = (valueObj) => {
    let unit = valueObj.unit || 'px';
    return valueObj.value + unit;
}