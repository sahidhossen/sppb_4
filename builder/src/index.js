import { Initialize } from "./init";

/**
 * Define global functions
 */
window.editorX = {
  desc: "Editor is on dev mode", 
};


document.body.onload = checkIframeLoaded();

function checkIframeLoaded() {
  let timeoutId;
  // Get a handle to the iframe element
  const iframe = document.getElementById("sppb-editor-view");
  const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
  
  if (iframeDoc.readyState == "complete") {
    // Clearing existing timeoutId if any
    if (timeoutId) window.clearTimeout(timeoutId);

    //Set global variable
    editorX._document = iframeDoc;
    editorX.iframe = iframe;

    editorX.sheet = (function() {
      // Create the <style> tag
      const _doc = window.frames["sppb-editor-view"].document; 
        let style = _doc.createElement("style");
  
        style.type = 'text/css';
        style.rel = 'stylesheet';
        // Add a media (and/or media query) here if you'd like!
        // WebKit hack :(
        style.appendChild(_doc.createTextNode(""));
    
        // Add the <style> element to the page
        _doc.head.appendChild(style);
    
        return style.sheet;
    })();

    // Check if loading is complete
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

