import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { mapValues } from "lodash";
import batchedSubscribeMiddleware from "./batching/middleware";
import batchedSubscribeEnhancer from "./batching/enhancer";
import * as actions from "../actions";
import * as selectors from "../selectors";
import reducer from "../reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reduxStore = (initialState) => {
  const store = createStore(
    reducer,
    initialState,
    composeEnhancers(batchedSubscribeEnhancer, applyMiddleware(batchedSubscribeMiddleware, thunkMiddleware))
  );

  return store;
};

export const createSPPBStore = () => {
  const store = reduxStore();

  const _actions = mapActions(actions, store);

  const _selectors = mapSelectors(selectors, store);

  const getActions = () => _actions;

  const getSelectors = () => _selectors;

  // Later will move to default-registry page
  const select = () => {
    return getSelectors();
  };

  const dispatch = () => {
    return getActions();
  };
  // Customize subscribe behavior to call listeners only on effective change,
  // not on every dispatch.
  store._genericStore = store.getState;

  const subscribe =
    store &&
    function (listener) {
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
    subscribe,
    select,
    dispatch,
    getActions,
    getSelectors,
  };
  return registryStore;
};

/**
 * Maps actions to dispatch from a given store.
 *
 * @param {Object} actions    Actions to register.
 * @param {Object} store      The redux store to which the actions should be mapped.
 * @return {Object}           Actions mapped to the redux store provided.
 */
function mapActions(actions, store) {
  const createBoundAction = (action) => (...args) => Promise.resolve(store.dispatch(action(...args)));
  return mapValues(actions, createBoundAction);
}

/**
 * Maps selectors to a redux store.
 *
 * @param {Object} selectors  Selectors to register. Keys will be used as the
 *                            public facing API. Selectors will get passed the
 *                            state as first argument.
 * @param {Object} store      The redux store to which the selectors should be mapped.
 * @return {Object}           Selectors mapped to the redux store provided.
 */
function mapSelectors(selectors, store) {
  const createStateSelector = (selector) => (...args) => selector(store.getState(), ...args);
  return mapValues(selectors, createStateSelector);
}
