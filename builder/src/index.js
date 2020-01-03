import React from "react";
import ReactDOM from "react-dom";
import { Provider as ReduxProvider } from "react-redux";

import Builder from "./builder";
import SppbTools from "./sppbTools";
import store from "./store";
import {registerCoreAddons} from './addonLibrary';

ReactDOM.render(
  <ReduxProvider store={store}>
    <SppbTools />
  </ReduxProvider>,
  document.getElementById("sppb_sidebar")
);

document.getElementById("sppb-editor-view").addEventListener("load", e => {
  if (document.getElementById("sppb-editor-view")) {
    let container = window.frames[
      "sppb-editor-view"
    ].window.document.getElementById("sppb_root_view");

    registerCoreAddons();

    ReactDOM.render(
      <ReduxProvider store={store}>
        <Builder />
      </ReduxProvider>,
      container
    );
  }
});
