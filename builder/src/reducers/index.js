import { combineReducers } from "redux";
import reduceReducers from "reduce-reducers";
import undoable from "redux-undo";
import builder from "./builder";
import addonListReducer from "./addonListReducer";
import builderControl from "./builderControl";
import styleStore from "./StyleStore";
import commonReducer from "./commonReducer";
import viewContextList from "./viewContextList";

const reducers = reduceReducers(
  combineReducers({
    builder: undoable(builder),
    addonList: addonListReducer,
    control: builderControl,
    styleStore: styleStore,
    viewContextList: viewContextList,
  }),
  commonReducer
);

export default reducers;
