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
  };

  const modalContent = show ? (
    <div className={classes.modalOverlay}>
      <div className={classes.modalStyle}>
        <div className={classes.modalHeader}>
          <Link href="#">
            <a onClick={handleCloseClick}>x</a>
          </Link>
        </div>
        <div className={classes.modalBody}>{children}</div>
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(modalContent, document.getElementById("modal-root"));
  } else {
    return null;
  }
};

export default Modal;
