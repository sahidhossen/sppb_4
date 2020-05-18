import { Initialize } from "./init";

// document.getElementById("sppb-editor-view").addEventListener("load", (e) => {
//   if (document.getElementById("sppb-editor-view")) {
//     let container = window.frames[
//       "sppb-editor-view"
//     ].window.document.getElementById("sppb_root_view");
//     if (container !== null) {
//       Initialize(container); // Initialize page builder from here
//     }
//   }
// });

document.body.onload = checkIframeLoaded();

function checkIframeLoaded() {
  let timeoutId;
  // Get a handle to the iframe element
  const iframe = document.getElementById("sppb-editor-view");
  const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
  // Check if loading is complete
  if (iframeDoc.readyState == "complete") {
    // Clearing existing timeoutId if any
    if (timeoutId) window.clearTimeout(timeoutId);
    // The loading is complete, call the function we want executed once the iframe is loaded
    afterLoading();
    return;
  }

  // If we are here, it is not loaded. Set things up so we check   the status again in 100 milliseconds
  timeoutId = window.setTimeout(checkIframeLoaded, 100);
}

function afterLoading() {
  let container = window.frames[
    "sppb-editor-view"
  ].window.document.getElementById("sppb_root_view");
  if (container) {
    // let s = getComputedStyle(container)
    // console.log("s: ",s)
    Initialize(container); // Initialize page builder from here
  }
}
