import { combineReducers } from "redux";
import reduceReducers from "reduce-reducers";
import undoable from "redux-undo";
import builder from "./builder";
import addonListReducer from "./addonListReducer";
import builderControl from "./builderControl";
import styleStore from "./StyleStore";
import commonReducer from "./commonReducer";
import viewContextList from "./viewContextList";
import popoverSettingPanel from "./popoverSettingPanel";
import styleBlockStore from './styleBlockStore';

const reducers = reduceReducers(
  combineReducers({
    builder: undoable(builder),
    addonList: addonListReducer,
    control: builderControl,
    viewContextList: viewContextList,
    popoverSettingPanel: popoverSettingPanel,
    styleBlockStore: styleBlockStore,
    styleStore
  }),
  commonReducer
);

export default reducers;
