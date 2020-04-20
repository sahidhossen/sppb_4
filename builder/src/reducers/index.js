import { combineReducers } from "redux";
import reduceReducers from 'reduce-reducers';
import undoable from "redux-undo";
import builder from "./builder";
import addonListReducer from './addonListReducer';
import builderControl from "./builderControl";
import commonReducer from './commonReducer';

 const reducers = reduceReducers( combineReducers({
    builder: undoable(builder),
    addonList: addonListReducer,
    control: builderControl
  }),
  commonReducer
)

export default reducers;