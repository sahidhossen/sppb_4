import React, { Fragment } from "react";
import { isEqual } from "lodash";
import { getBlockById } from "../../lib/utils";

class Root extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    // console.log("change: ", nextProps.block.childrens, this.props.block.childrens)
    if (isEqual(nextProps.block.childrens, this.props.block.childrens)) {
      // return false;
    }
    return true;
  }
  render() {
    const { block, connectDropTarget, isOver } = this.props;
    // console.log("render: ")
    return block.childrens.length > 0
      ? block.childrens.map((blockId, index) => {
          const childBlock = getBlockById(blockId);
          const { Component, name } = childBlock;
          const activeClass = isOver ? "active" : "";
          return (
            <Fragment key={index}>
              <Component index={index} block={childBlock} addonId={blockId} />
            </Fragment>
          );
        })
      : connectDropTarget(
          <div className="empty-block">
            <p> Please add addon here </p>
          </div>
        );
  }
}
export default Root;
