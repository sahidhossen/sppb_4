import React, { Component } from "react";
import ListItem from "./ListItem";

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      contextStyle: {
        visibility: "none",
      },
    };
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside.bind(this));
    window.frames["sppb-editor-view"].document.addEventListener(
      "mousedown",
      this.handleClickOutside.bind(this)
    );
    this.getContextMenuPosition();
  }

  componentWillUnmount() {
    document.removeEventListener(
      "mousedown",
      this.handleClickOutside.bind(this)
    );
    window.frames["sppb-editor-view"].document.removeEventListener(
      "mousedown",
      this.handleClickOutside.bind(this)
    );
  }

  handleClickOutside(event) {
    if (
      this.contextMenuWrapper &&
      !this.contextMenuWrapper.contains(event.target)
    ) {
      this.props.reset();
    }
  }

  getContextMenuPosition() {
    let { event, isSubList } = this.props;
    if (this.contextMenuTimer) {
      clearTimeout(this.contextMenuTimer);
    }
    this.contextMenuTimer = setTimeout(() => {
      const rect = this.contextMenuWrapper.getBoundingClientRect();
      const targetRect = this.props.target.getBoundingClientRect();
      const docRect = document.body.getBoundingClientRect();
      // console.log("wo: ", docRect)
      let leftDistance, topDistance;
      if (isSubList) {
        // console.log(this.contextMenuWrapper, this.props.target, document.body);
        if (docRect.width - targetRect.right > rect.width) {
          leftDistance = targetRect.right + 10;
        } else {
          leftDistance = targetRect.left - targetRect.width - 10;
        }
        topDistance = targetRect.y;
      } else {
        leftDistance = event.clientX + docRect.left;
        topDistance = targetRect.y + targetRect.height; // Right after the element
      }
      // calculating left position
      if (event.clientX + rect.width > docRect.left + docRect.width) {
        leftDistance = event.clientX - rect.width;
      }
      // calculating top position
      if (event.clientY + rect.height > window.innerHeight) {
        topDistance = event.clientY - rect.height;
      }

      this.setState({
        contextStyle: {
          visibility: "visible",
          top: topDistance + "px",
          left: leftDistance + "px",
        },
      });
    });
  }

  render() {
    let { viewContextList, isSubList } = this.props;
    return (
      <div
        className="editor-x-context-menu-list editor-x-popup"
        style={this.state.contextStyle}
        ref={(ref) => {
          this.contextMenuWrapper = ref;
        }}
      >
        <ul className="editor-x-context-menu">
          {Object.keys(viewContextList).map((item) => {
            // just demo purpose
            let hasSubList = item === "code" && !isSubList ? true : false;
            let listItem = viewContextList[item];
            return (
              <ListItem
                key={item}
                listItem={listItem}
                hasSubList={hasSubList}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}

export default List;
