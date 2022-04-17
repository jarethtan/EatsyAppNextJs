import React, { useEffect, useRef, useState } from "react";
import * as ReactDOM from "react-dom";
import classes from "./Modal.module.css";
import Link from "next/link";

const Modal = ({ show, onClose, children }) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
  }; // This function is not used because we need to reset the search form when we close the modal. and we need to use method.reset(). So the close button moves to the navsearch component instead. for this modal component to be reusable, we will leave this function here.

  const modalContent = show ? (
    <div className={classes.modalOverlay}>
      <div className={classes.modalStyle}>{children}</div>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(modalContent, document.getElementById("modal-root"));
  } else {
    return null;
  }
};

export default Modal;
