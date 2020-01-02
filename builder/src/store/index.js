import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import reducer from "../reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reduxStore = initialState => { 

  const middleware = applyMiddleware(thunkMiddleware)

  const store = createStore(
    reducer,
    initialState,
    composeEnhancers(middleware)
  );
  
  return store;
}

export default reduxStore();
