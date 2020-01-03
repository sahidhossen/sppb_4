import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import reducer from "../reducers";
import {subscribe} from './subscriber';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reduxStore = initialState => { 

  const middleware = applyMiddleware(thunkMiddleware)

  const store = createStore(
    reducer,
    initialState,
    composeEnhancers(middleware)
  );
  

  subscribe(store);

  return store;
}

export default reduxStore();
