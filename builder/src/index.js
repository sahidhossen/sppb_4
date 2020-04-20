import {Initialize} from './init';

document.getElementById("sppb-editor-view").addEventListener("load", e => {
  if (document.getElementById("sppb-editor-view")) {
    let container = window.frames[
      "sppb-editor-view"
    ].window.document.getElementById("sppb_root_view");
    if (container !== null) {
      Initialize(container); // Initialize page builder from here
    }
  }
});
