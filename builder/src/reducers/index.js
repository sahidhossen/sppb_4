import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import undoable, { includeAction, excludeAction } from "redux-undo";
import builder from "./builder";
import builderControl from "./builderControl";

const reducer = combineReducers({
  builderData: undoable(builder),
  control: builderControl
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default initialState =>
  createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(thunkMiddleware))
  );
