import React from "react";
import classnames from "classnames/bind";
import GridView from "./components/GridView";
import WithDropArea from './components/WithDropArea';
import AddonList from "./components/AddonList";
import { withSelect, withDispatch } from "store";
import { compose } from "./components/compose";

class Canvas extends React.Component {
  constructor() {
    super();
    this.setBlockListRef = this.setBlockListRef.bind(this);
  }

  setBlockListRef(node) {
    this.wrapperNode = node;
    // it depents on this.wrapperNode but we can't keep this.wrapperNode in state
    // Because we need it to be immediately availeble for `focusableTabbable` to work.
    this.forceUpdate();
  }

  render() {
    let { attributes, mediaQuery, isAddonPicked } = this.props;
    let { gridGap, gridCol } = attributes;
        let style = {
            gridTemplateColumns: `repeat(${gridCol}, minmax(calc((${mediaQuery.value}px + ${gridGap})/${gridCol} - ${gridGap}), 1fr))`,
            // gridTemplateColumns: `repeat(auto-fit, minmax(calc((${mediaQuery.value}px + ${gridGap})/${gridCol} - ${gridGap}), 1fr))`,
            gridAutoRows: `calc((${mediaQuery.value}px + ${gridGap})/${gridCol} - ${gridGap})`,
            width: `${mediaQuery.value}px`,
            gridAutoFlow: 'row dense',
            gridGap: gridGap,
      "--gr": "auto",
      "--x": "auto",
      "--y": "auto",
      "--w": "auto",
      "--h": "auto",
    };

    console.log("canvas")

    return (
      <WithDropArea
        container={this.wrapperNode}>
          { ( { isHover } ) => {
             const className = classnames({
                "sppb-builder-wrapper": true,
                "cursor-draggable": isAddonPicked && isHover,
              });
              return (
                <div className={className} ref={this.setBlockListRef}>
                    <AddonList />
                </div>
              )
      	    } }
      </WithDropArea>  
    );
  }
}

export default compose(
  withSelect((select) => {
    const { getAddon, getActiveMediaQuery, isAddonPicked } = select();
    const { attributes } = getAddon("root");

    return {
      mediaQuery: getActiveMediaQuery(),
      attributes,
      isAddonPicked: isAddonPicked(),
    };
  })
)(Canvas);
