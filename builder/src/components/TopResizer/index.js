import React, { Component } from "react";
import { withSelect, withDispatch } from "store";
import { compose } from "../compose";

export class TopResizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leftValue: 0,
      rightValue: props.mediaQuery.value,
      isMouseMove: false,
    };
    this.leftResizerRef = React.createRef();
    this.rightResizerRef = React.createRef();
  }

  componentDidMount() {
    this.toggleListeners(this.leftResizerRef.current);
    this.toggleListeners(this.rightResizerRef.current);
  }

  componentWillUnmount() {
    this.toggleListeners(this.leftResizerRef.current, false);
    this.toggleListeners(this.rightResizerRef.current, false);
  }

  toggleListeners(node, shouldListnToEvents = true) {
    const method = shouldListnToEvents
      ? "addEventListener"
      : "removeEventListener";

    // drag
    node[method]("mousedown", this.onMouseDown.bind(this, node));
    node[method]("mousemove", this.onMouseMove.bind(this, node));
    node[method]("mouseup", this.onMouseUp.bind(this, node));
  }

  onMouseDown(node, event) {
    const { isMouseMove } = this.state;
    if (!isMouseMove) {
      const shiftX = event.clientX - node.getBoundingClientRect().left;
      console.log("down", shiftX);
      // left handler
      if (node === this.leftResizerRef.current) {
        this.setState((state) => ({
          ...state,
          isMouseMove: true,
          leftValue: shiftX,
        }));
      }

      // right handler
      if (node === this.rightResizerRef.current) {
        this.setState((state) => ({
          ...state,
          isMouseMove: true,
          rightValue: shiftX,
        }));
      }
    }
  }

  onMouseMove(node, event) {
    const { isMouseMove } = this.state;
    if (isMouseMove) {
      console.log("mousemove", node);

      // left handler
      if (node === this.leftResizerRef.current) {
        console.log(event.pageX - this.state.leftValue - 273);
        this.setState((state) => ({
          ...state,
          leftValue: event.pageX - this.state.leftValue - 273,
        }));
      }

      // right handler
      if (node === this.rightResizerRef.current) {
        this.setState((state) => ({
          ...state,
          rightValue: event.pageX - 270 - this.state.rightValue,
        }));
      }
    }
  }

  onMouseUp(node, event) {
    const { isMouseMove } = this.state;
    if (isMouseMove) {
      console.log("mouseup", node);
      this.setState((state) => ({ ...state, isMouseMove: false }));
    }

    // remove event listeners
    this.toggleListeners(this.leftResizerRef.current, false);
    this.toggleListeners(this.rightResizerRef.current, false);
  }

  render() {
    // console.log(this.props.mediaQuery);
    const { leftValue, rightValue } = this.state;
    return (
      <div className="editor-x-top-resizer">
        <div
          className="editor-x-resizer-left-container"
          ref={this.leftResizerRef}
          style={{ left: `${leftValue}px` }}
        >
          <span className="editor-x-resizer-left-handler">
            <i className="fas fa-grip-lines-vertical"></i>
          </span>
          <span className="editor-x-resizer-left-value">{leftValue}</span>
        </div>
        <div
          className="editor-x-resizer-right-container"
          ref={this.rightResizerRef}
          style={{ left: `${rightValue}px` }}
        >
          <span className="editor-x-resizer-right-value">{rightValue}</span>
          <span className="editor-x-resizer-right-handler">
            <i className="fas fa-grip-lines-vertical"></i>
          </span>
        </div>
      </div>
    );
  }
}

export default compose(
  withSelect((select) => {
    const { getActiveMediaQuery } = select();

    return {
      mediaQuery: getActiveMediaQuery(),
    };
  })
)(TopResizer);
