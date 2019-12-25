import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import reducer from '../reducers';
const store =  ( initialState ) =>
    createStore( reducer, initialState, applyMiddleware( thunkMiddleware ) );

export default store();