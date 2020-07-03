import React, { forwardRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";

const getContainer = (container) => {
  container = typeof container === "function" ? container() : container;
  return ReactDOM.findDOMNode(container);
};

const EditorXPortal = forwardRef((props, ref) => {
  const { children, disablePortal, container } = props;
  const [monutedNode, setMountedNode] = useState(null);

  useEffect(() => {
    if (!disablePortal) {
      setMountedNode(getContainer(container) || document.body);
    }
  }, [container, disablePortal]);

  return monutedNode ? ReactDOM.createPortal(children, monutedNode) : monutedNode;
});

EditorXPortal.proptypes = {
  children: PropTypes.node,
  container: PropTypes.oneOfType([PropTypes.instanceOf(React.Component), PropTypes.func]),
  disablePortal: PropTypes.bool,
};

export default EditorXPortal;
