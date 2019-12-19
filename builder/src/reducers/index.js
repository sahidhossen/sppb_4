import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import undoable, { includeAction, excludeAction } from 'redux-undo';
import builder from './builder'; 
import builderControl from './builderControl';

const reducer = combineReducers( {
    builderData: undoable(builder),
    control: builderControl
} );

export default ( initialState ) =>
    createStore( reducer, initialState, applyMiddleware( thunkMiddleware ) );
