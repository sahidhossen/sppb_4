import _ from 'lodash';
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
 /**
  * Expetional to select page data
  * It will escape present keyword and retrive only the data part
  */
 if (storeKey === 'data') {
    let {builder} = currentState.data.present;
    return builder;
 }
 // retrive data from redux state
 return typeof currentState[storeKey] === 'undefined' ? {} : {...currentState[storeKey]};

}
