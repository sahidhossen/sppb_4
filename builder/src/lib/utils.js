export const revisedRandId = () => {
    const S4 = function() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
     };
     return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

export const isObject = ( obj ) => typeof obj === 'function' || typeof obj === 'object' && !!obj;
export const isArray = (arg) => Object.prototype.toString.call(arg) === '[object Array]';

export const getBlockById = (blocks, blockId ) => {
    return blocks[blockId]
}