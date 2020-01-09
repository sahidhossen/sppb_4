import {select} from 'store';

export const revisedRandId = () => {
  const S4 = function() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  );
};

export const isObject = obj =>
  typeof obj === "function" || (typeof obj === "object" && !!obj);
export const isArray = arg =>
  Object.prototype.toString.call(arg) === "[object Array]";

export const getBlockById = (blockId) => {
  const builder = select('data');
  return builder[blockId];
};

export const serialBlockList = addonLists => {
  let _addonLists = {};
  for (const key in addonLists) {
    const list = addonLists[key].list;
    for (let i = 0; i < list.length; i++) {
      _addonLists[list[i].name] = list[i];
    }
  }
  return _addonLists;
};

export const blockListForTools = blockList => {
  const _blocklist = {};
  Object.keys(blockList).map((name, index) => {
    const __b = blockList[name];
    const __c = __b.category.toLowerCase();
    if (typeof _blocklist[__c] === "undefined")
      _blocklist[__c] = { title: __c, list: [] };
    _blocklist[__c].list.push(__b);
  });
  return _blocklist;
};
