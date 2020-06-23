import React, { forwardRef, useRef, useEffect, useState } from "react";
import classnames from "classnames";
import { withSelect, withDispatch } from "store";
import { debounce } from "lodash";
import { Scrollbars } from "react-custom-scrollbars";
import { compose } from "../compose";
import ShadowSVG from "./shadowSVG";

const svgFixedWidth = 12;

const NavigatorComponent = forwardRef((props, ref) => {
  const { addons, selectAddonId, onSelectAddon } = props;
  const [collapseIds, setCollapseId] = useState({});
  const [addonIdList, setAddonIdList] = useState([]);
  const [navigationHeight, setNavigationHeight] = useState(0);
  const [addonDomList, setAddonDomList] = useState([]);
  const wrapperNode = useRef(null);

  const setNavigationWrapper = (node) => {
    if (node) {
      wrapperNode.current = node;
      const bound = node.getBoundingClientRect();
      setNavigationHeight(bound.height - 88);
    }
  };

  useEffect(() => {
    // Loadsh debounce has a cancel func
    // Ref: https://lodash.com/docs/4.17.15#debounce
    const handleResize = debounce(() => {
      if (wrapperNode) {
        const bound = wrapperNode.current.getBoundingClientRect();
        setNavigationHeight(bound.height - 88);
      }
    });
    window.addEventListener("resize", handleResize);
    return () => {
      handleResize.cancel();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const onCollapseHandler = (addonId) => () => {
    const _ids = { ...collapseIds };
    if (_ids[addonId]) {
      delete _ids[addonId];
    } else {
      _ids[addonId] = true;
    }
    setCollapseId(_ids);
  };

  const onSelectHandler = (addonId) => () => {
    onSelectAddon(addonId);
  };

  const collectAddon = (collection) => {
    return collection.map((item) => {
      const { addonId, depth, hasChildren, isCollapse } = item;
      const addon = addons[addonId];
      const svgWidth = svgFixedWidth * (depth - 1);
      const itemClass = classnames("editor-x-navigator-layer", `editor-x-layer-depth-${depth}`, {
        "editor-x-selected-layer": selectAddonId === addonId,
      });
      if (isCollapse) return null;
      return (
        <div key={addon.id} className={itemClass}>
          <svg viewBox={`0 0 ${svgWidth} 24`} width={svgWidth} height="24">
            <rect fill="url(#TREE_VIEW_BRANCH_SVG_PATTERN_ID)" x="0" y="0" width={svgWidth} height="24"></rect>
          </svg>
          <div style={{ height: 24, width: 12 }}>
            {hasChildren && (
              <div
                style={{
                  display: "flex",
                  position: "relative",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                <div className="editor-x-navigator-collaps" onClick={onCollapseHandler(addonId)}>
                  {collapseIds[addonId] ? <i className="fas fa-caret-up"></i> : <i className="fas fa-caret-down"></i>}
                </div>
              </div>
            )}
          </div>
          <span className="fas fa-grip-horizontal editor-x-navigator-drag"></span>
          <div className="editor-x-navigator-content" onClick={onSelectHandler(addonId)}>
            <span className="editor-x-navigator-hash">#</span>
            <span className="editor-x-navigator-text">{addon.name}</span>
          </div>
          <span className="fas fa-ellipsis-h editor-x-navigator-dot-btn"></span>
        </div>
      );
    });
  };

  const collectAddonIds = (addonIds, collection = [], depth = 0, isCollapse = false) => {
    depth++;
    addonIds.map((addonId) => {
      const _isCollapse = isCollapse || collapseIds[addonId] ? true : false;
      const addon = addons[addonId];
      const hasChildren = addon.childrens.length > 0;
      const collector = {
        addonId: addonId,
        hasChildren,
        depth,
        isCollapse,
      };
      collection.push(collector);

      if (hasChildren) collectAddonIds(addon.childrens, collection, depth, _isCollapse);
    });
    return collection;
  };

  useEffect(() => {
    if (addons.root) {
      const listOfAddon = collectAddonIds(addons.root.childrens);
      setAddonIdList(listOfAddon);
    }
  }, [addons, collapseIds]);

  useEffect(() => {
    if (addonIdList.length) {
      const listOfAddon = collectAddon(addonIdList);
      setAddonDomList(listOfAddon);
    }
  }, [addonIdList, selectAddonId]);

  return (
    <div className="editor-x-navigator" ref={setNavigationWrapper}>
      <ShadowSVG />
      <Scrollbars style={{ height: navigationHeight }}>{addonDomList}</Scrollbars>
    </div>
  );
});

export default compose([
  withSelect((select) => {
    let { getAddons, selectedAddonId } = select();
    return {
      addons: getAddons(),
      selectAddonId: selectedAddonId(),
    };
  }),
  withDispatch((dispatch) => {
    const { selectAddon } = dispatch();
    return {
      onSelectAddon(addonId) {
        selectAddon(addonId);
      },
    };
  }),
])(NavigatorComponent);
