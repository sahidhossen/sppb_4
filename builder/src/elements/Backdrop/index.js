import * as React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const Backdrop = React.forwardRef((props, ref) => {
  const { invisible = false, open, ...other } = props;
  const classNames = classnames("editor-x-element-backdrop", {
    "editor-x-element-backdrop-visible": invisible,
  });
  return open ? <div className={classNames} aria-hidden ref={ref} {...other} /> : null;
});

Backdrop.propTypes = {
  /**
   * If `true`, the backdrop is invisible.
   * It can be used when rendering a popover or a custom select component.
   */
  invisible: PropTypes.bool,
  open: PropTypes.bool.isRequired,
};

export default Backdrop;
