import React from "react";
import { compose } from "../../../compose";
import { withSelect, withDispatch } from "store";

/**
 * @param {Object} param0
 */
const SettingsHeader = ({ tabName, openDocker }) => {
  return (
    <div className="sppb-editor-panel">
      <ul>
        <li className={tabName === "navigator" ? "active" : ""} onClick={() => openDocker("navigator")}>
          Navigator
        </li>
        <li className={tabName === "bookmark" ? "active" : ""} onClick={() => openDocker("bookmark")}>
          Bookmark
        </li>
      </ul>
    </div>
  );
};

export default compose([
  withSelect((select) => {
    const { getSelectedAddon } = select();
    const addon = getSelectedAddon();
  }),
  withDispatch((dispatch) => {
    const { updateDocker } = dispatch();
    return {
      openDocker(tabName) {
        updateDocker("navigator", tabName);
      },
    };
  }),
])(SettingsHeader);
