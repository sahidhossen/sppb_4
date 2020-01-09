import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import reducer from "../reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reduxStore = initialState => {
  const middleware = applyMiddleware(thunkMiddleware);

  const store = createStore(
    reducer,
    initialState,
    composeEnhancers(middleware)
  );
  return store;
};

export const createSPPBStore = () => {
  const store = reduxStore();
  // Customize subscribe behavior to call listeners only on effective change,
  // not on every dispatch.
  store._genericStore = store.getState;

  const subscribe =
    store &&
    function(listener) {
      let lastState = store.getState();
      store.subscribe(() => {
        const currentState = store.getState();
        const hasChanges = lastState !== currentState;
        lastState = currentState;
        if (hasChanges) {
          listener(currentState);
        }
      });
    };
    
  const registryStore = {
    store,
    subscribe
  };
  return registryStore;
};
