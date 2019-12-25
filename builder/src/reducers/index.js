import {  combineReducers } from "redux";
import undoable from 'redux-undo';
import builder from './builder'; 
import builderControl from './builderControl';

export default combineReducers( {
    builderData: undoable(builder),
    control: builderControl
} );