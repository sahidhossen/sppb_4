<Transition
  items={open}
  onDestroyed={onDestroyedHandler}
  config={{ tension: 1000, friction: 50, mass: 3 }}
  from={(open) => {
    return {
      overflow: "hidden",
      transform: "translate3d(5px,0,0)",
      opacity: 0,
    };
  }}
  enter={(node) => {
    console.log("node: ", node);
    const coord = getTopLeft(wrapperNode.current, contentAnchorRef.current);
    return {
      opacity: 1,
      transform: "translate3d(0,0,0)",
      ...coord,
    };
  }}
  leave={{ opacity: 0, transform: "translate3d(5px,0,0)" }}
  trail={30}
>
  {(isOpen) =>
    isOpen &&
    ((props) => (
      <animated.div className="editor-x-menu-list" style={{ ...props }}>
        {items}
      </animated.div>
    ))
  }
</Transition>;

<animated.div className="editor-x-menu-list" style={{ ...springProps }}>
  {items}
</animated.div>;
