import React from "react";
import classnames from "classnames/bind";
import GridView from "./components/GridView";
import WithDropArea from "./components/WithDropArea";
import AddonList from "./components/AddonList";
import { withSelect, withDispatch } from "store";
import { compose } from "./components/compose";
import ComponentPortal from "./helpers/ComponentPortal";

class Canvas extends React.Component {
  constructor() {
    super();
    this.state = {
      cursorPosition: {
        x: -9999,
        y: -9999,
      },
    };
    this.setBlockListRef = this.setBlockListRef.bind(this);
    this.createCustomCursor = this.createCustomCursor.bind(this);
  }

  componentDidMount() {
    window.frames["sppb-editor-view"].document.addEventListener(
      "mousemove",
      this.createCustomCursor.bind(this)
    );
  }

  componentWillUnmount() {
    window.frames["sppb-editor-view"].document.removeEventListener(
      "mousemove",
      this.createCustomCursor.bind(this)
    );
  }

  createCustomCursor(event) {
    const { isAddonPicked } = this.props;

    if (isAddonPicked) {
      this.setState((state) => ({
        ...state,
        cursorPosition: {
          x: event.clientX + 290,
          y: event.clientY + 110,
        },
      }));
    }

    if (!isAddonPicked) {
      window.frames["sppb-editor-view"].document.removeEventListener(
        "mousemove",
        this.createCustomCursor.bind(this)
      );
      this.setState((state) => ({
        ...state,
        cursorPosition: {
          x: -9999,
          y: -9999,
        },
      }));
    }
  }

  setBlockListRef(node) {
    this.wrapperNode = node;
    // it depents on this.wrapperNode but we can't keep this.wrapperNode in state
    // Because we need it to be immediately availeble for `focusableTabbable` to work.
    this.forceUpdate();
  }

  render() {
    let { attributes, mediaQuery, isAddonPicked, pickedAddon } = this.props;
    const { cursorPosition } = this.state;
    let { gridGap, gridCol } = attributes;

    let style = {
      gridTemplateColumns: `repeat(${gridCol}, minmax(calc((${mediaQuery.value}px + ${gridGap})/${gridCol} - ${gridGap}), 1fr))`,
      // gridTemplateColumns: `repeat(auto-fit, minmax(calc((${mediaQuery.value}px + ${gridGap})/${gridCol} - ${gridGap}), 1fr))`,
      gridAutoRows: `calc((${mediaQuery.value}px + ${gridGap})/${gridCol} - ${gridGap})`,
      width: `${mediaQuery.value}px`,
      gridAutoFlow: "row dense",
      gridGap: gridGap,
      "--gr": "auto",
      "--x": "auto",
      "--y": "auto",
      "--w": "auto",
      "--h": "auto",
    };

    const cursorStyle = {
      position: "fixed",
      left: `${cursorPosition.x}px`,
      top: `${cursorPosition.y}px`,
      zIndex: 10,
    };

    return (
      <WithDropArea container={this.wrapperNode}>
        {({ isHover }) => {
          const className = classnames({
            "sppb-builder-wrapper": true,
            "cursor-draggable": isAddonPicked && isHover,
          });
          return (
            <div className={className} ref={this.setBlockListRef}>
              <AddonList />
              {isAddonPicked && (
                <ComponentPortal>
                  <span className="custom-cursor" style={cursorStyle}>
                    {pickedAddon.title}
                  </span>
                </ComponentPortal>
              )}
            </div>
          );
        }}
      </WithDropArea>
    );
  }
}

export default compose(
  withSelect((select) => {
    const {
      getAddon,
      getActiveMediaQuery,
      isAddonPicked,
      getPickedAddon,
    } = select();
    const { attributes } = getAddon("root");

    return {
      mediaQuery: getActiveMediaQuery(),
      attributes,
      isAddonPicked: isAddonPicked(),
      pickedAddon: getPickedAddon(),
    };
  })
)(Canvas);
