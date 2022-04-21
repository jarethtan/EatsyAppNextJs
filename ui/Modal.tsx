import React, { useEffect, useState } from "react";
import * as ReactDOM from "react-dom";
import classes from "./Modal.module.css";

const Modal: React.FC<{ show: boolean; onClose: any; children: any; modalFunction: string }> = ({ show, onClose, children, modalFunction }) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleCloseClick = (e: any) => {
    e.preventDefault();
    onClose();
  }; // This function is not used because we need to reset the search form when we close the modal. and we need to use method.reset(). So the close button moves to the navsearch component instead. for this modal component to be reusable, we will leave this function here.

  const modalContent = show ? (
    <div
      onClick={modalFunction !== "navSearch" ? handleCloseClick : () => ""}
      className={classes.modalOverlay}
      style={modalFunction !== "navSearch" ? { backgroundColor: "rgba(0, 0, 0, 0)" } : { backgroundColor: "rgba(0, 0, 0, 0.75)" }}
    >
      <div className={classes.modalStyle}>{children}</div>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(modalContent, document.getElementById("modal-root") as any);
  } else {
    return null;
  }
};

export default Modal;
