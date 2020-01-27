import { combineReducers } from "redux";
import undoable from "redux-undo";
import builder from "./builder";
import addonListReducer from './addonListReducer';
import builderControl from "./builderControl";

export default combineReducers({
  builder: undoable(builder),
  addonList: addonListReducer,
  control: builderControl
});
