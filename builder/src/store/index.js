import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import reducer from "../reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = initialState =>
  createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(thunkMiddleware))
  );

export default store();
