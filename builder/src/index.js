import React from "react";
import ReactDOM from "react-dom";
import { Provider as ReduxProvider } from "react-redux";

import Builder from "./builder";
import SppbTools from "./sppbTools";
import store from "./store";
import {AddonRegister} from './baseLayer';
import Heading from './components/Heading';
import Paragraph from './components/Paragraph';

AddonRegister(Heading);
AddonRegister(Paragraph);

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
    ReactDOM.render(
      <ReduxProvider store={store}>
        <Builder />
      </ReduxProvider>,
      container
    );
  }
});
