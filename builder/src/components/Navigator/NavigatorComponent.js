import React, { forwardRef, useRef, useEffect, useState } from "react";
import classnames from "classnames";
import { debounce, isEqual } from "lodash";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Scrollbars } from "react-custom-scrollbars";
import { withSelect, withDispatch } from "store";
import { compose } from "../compose";
import ShadowSVG from "./shadowSVG";

const svgFixedWidth = 12;

const deepCompareEquals = (a, b) => {
  return isEqual(a, b);
};

const useDeepCompareMemoize = (value) => {
  const ref = useRef();
  if (!deepCompareEquals(value, ref.current)) {
    ref.current = value;
  }
  return ref.current;
};

const useDeepCompareEffect = (callback, dependencies) => {
  useEffect(callback, useDeepCompareMemoize(dependencies));
};

const getStyle = (provided, snapshot) => {
  return {
    cursor: snapshot.isDragging ? "grab" : "pointer",
    ...provided.draggableProps.style,
  };
};

const NavigatorComponent = forwardRef((props, ref) => {
  const { addons, selectAddonId, onSelectAddon, onMoveAddon } = props;
  const [isMoved, setMoved] = useState(false);
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

  const onCollapseHandler = (addonId) => (e) => {
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
    return collection.map((item, index) => {
      const { addonId, depth, hasChildren } = item;
      const addon = addons[addonId];
      const svgWidth = svgFixedWidth * (depth - 1);
      const itemClass = classnames("editor-x-navigator-layer", `editor-x-layer-depth-${depth}`, {
        "editor-x-selected-layer": selectAddonId === addonId,
      });

      let title = addon.title || addon.name;
      if (addon.id === "root") title = "Body";

      return (
        <Draggable key={addon.id} draggableId={addon.id} index={index} isDragDisabled={addon.id === "root"}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={getStyle(provided, snapshot)}
              key={addon.id}
              className={itemClass}
            >
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
                      {collapseIds[addonId] ? (
                        <i className="fas fa-caret-right"></i>
                      ) : (
                        <i className="fas fa-caret-down"></i>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <span className="fas fa-grip-horizontal editor-x-navigator-drag"></span>
              <div className="editor-x-navigator-content" onClick={onSelectHandler(addonId)}>
                <span className="editor-x-navigator-hash">#</span>
                <span className="editor-x-navigator-text">{title}</span>
              </div>
              <span className="fas fa-ellipsis-h editor-x-navigator-dot-btn"></span>
            </div>
          )}
        </Draggable>
      );
    });
  };

  const collectAddonIds = (addonIds, collection = [], depth = 0, isCollapse = false) => {
    depth++;
    for (let i = 0; i < addonIds.length; i++) {
      const addonId = addonIds[i];
      const addon = addons[addonId];
      const hasChildren = addon.childrens && addon.childrens.length > 0;
      const collector = {
        addonId: addonId,
        hasChildren,
        depth,
        isCollapse,
      };
      if (isCollapse === false) {
        collection.push(collector);
      }
      const _isCollapse = isCollapse || collapseIds[addonId] ? true : false;
      if (hasChildren) collectAddonIds(addon.childrens, collection, depth, _isCollapse);
    }
    return collection;
  };

  useEffect(() => {
    if (addons.root) {
      const listOfAddon = collectAddonIds(["root"]);
      setAddonIdList(listOfAddon);
    }
  }, [addons, collapseIds]);

  useEffect(() => {
    if (addonIdList.length) {
      const listOfAddon = collectAddon(addonIdList);
      setAddonDomList(listOfAddon);
    }
  }, [addonIdList, selectAddonId]);

  const onDragEndHandler = (result) => {
    let { draggableId, source, destination } = result;

    if (source && destination && source.index === destination.index) {
      return;
    }

    if (destination === null) {
      // End of the body
      const index = addons.root.childrens.length;
      if (onMoveAddon) {
        onMoveAddon({ index, addonId: draggableId, parentId: "root" });
        setMoved(!isMoved);
      }
    } else {
      const addon = addons[draggableId];
      const sourceParent = addons[addon.parentId];
      const destinationItem = addonIdList[destination.index];
      const destinationAddon = addons[destinationItem.addonId];
      let parentId = destinationAddon.parentId || "root";

      if (source.index < destination.index && destinationAddon.accept && !collapseIds[destinationItem.addonId]) {
        /**
         * If destination item has children and not collapsed
         *  -
         * If destination item has children and collapsed
         */
        parentId = destinationItem.addonId;
      }
      const parentAddon = addons[parentId];

      let index = parentAddon.childrens.indexOf(destinationItem.addonId);

      const { name, accept } = parentAddon;
      if (addon.name === name || !accept || (Array.isArray(accept) && accept.includes(name))) {
        return;
      }

      if (source.index < destination.index && sourceParent.id !== parentAddon.id) {
        // Top to bottom
        index = index + 1;
      }

      if (onMoveAddon) {
        onMoveAddon({ index: index, addonId: draggableId, parentId: parentAddon.id });
        setMoved(!isMoved);
      }
    }
  };

  const onDragUpdateHandler = (result) => {
    if (result.destination && result.destination.index === 0) return;
  };

  const onBeforeCaptureHandler = (result) => {
    const { draggableId } = result;
    if (addons[draggableId].childrens && addons[draggableId].childrens.length && !collapseIds[draggableId]) {
      setCollapseId({ ...collapseIds, [draggableId]: true });
    }
  };
  // console.log("drag update: ", addons);
  return (
    <div className="editor-x-navigator" ref={setNavigationWrapper}>
      <ShadowSVG />
      <Scrollbars style={{ height: navigationHeight }}>
        <DragDropContext
          onDragEnd={onDragEndHandler}
          onDragUpdate={onDragUpdateHandler}
          onBeforeCapture={onBeforeCaptureHandler}
        >
          <Droppable droppableId="editor-x-navigation-list">
            {(provided, snapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {addonDomList}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </Scrollbars>
    </div>
  );
});

export default compose([
  withSelect((select) => {
    let { getAddons, selectedAddonId } = select();
    const addons = getAddons();
    return {
      addons,
      selectAddonId: selectedAddonId(),
    };
  }),
  withDispatch((dispatch) => {
    const { selectAddon, moveAddon } = dispatch();
    return {
      onSelectAddon(addonId) {
        selectAddon(addonId);
      },
      onMoveAddon(payload) {
        moveAddon(payload);
      },
    };
  }),
])(NavigatorComponent);
