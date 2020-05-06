// import combineReducers from 'turbo-combine-reducers';
import { combineReducers } from "redux";
import StyleBlockStore from './StyleBlockStore'; 
import StylePropertyStore from './StylePropertyStore'; 

export default combineReducers({
    BlockStore: StyleBlockStore, 
    PropertyStore: StylePropertyStore
})