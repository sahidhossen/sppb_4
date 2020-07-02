import React from "react";
import EditorXPortal from "../../components/portal";
import Backdrop from "../Backdrop";

const SelectBackdrop = (props) => {
  const { children, open, onClose } = props;

  const onBackdropHandler = (event) => {
    if (event.target !== event.currentTarget) {
      return;
    }

    if (onClose) {
      onClose(event, "backdropClick");
    }
  };
  console.log(open);
  if (!open) return null;
  return (
    <EditorXPortal>
      <div className="editor-x-select-popover">
        <Backdrop invisible={true} open={open} onClick={onBackdropHandler} />
        {children}
      </div>
    </EditorXPortal>
  );
};

export default SelectBackdrop;
