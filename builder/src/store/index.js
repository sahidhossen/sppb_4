import {createSPPBStore} from './createStore';
const sppbStore = createSPPBStore();

export const store = sppbStore.store;
export const dispatch = store.dispatch;
export const subscribe = sppbStore.subscribe;
/**
* This select function will return individual redux storage
* select('data')
* @param {String} storeKey Store key 
*/

export const select = (storeKey) => {
 const currentState = store._genericStore();
 return typeof currentState[storeKey] === 'undefined' ? {} : {...currentState[storeKey]};
}
