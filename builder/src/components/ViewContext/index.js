import React, { Component, createContext } from "react";
import { viewContextAction } from "./action";
import { viewContextReducer } from "./reducer";

const ViewContext = createContext();

class ViewContextProvider extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      value: "",
    };
    this.dispatch = this.dispatch.bind(this);
  }

  dispatch(action) {
    this.setState((state) => viewContextReducer(state, action));
  }

  render() {
    return (
      <ViewContext.Provider
        value={{ state: this.state, dispatch: this.dispatch }}
      >
        {this.props.children}
      </ViewContext.Provider>
    );
  }
}

export { ViewContextProvider, viewContextAction, ViewContext };
