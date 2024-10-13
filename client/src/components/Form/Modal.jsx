import React from "react";
import ReactDom from "react-dom";
import "./Modal.scss";

const Modal = ({ open, children, onClose }) => {
  if (!open) {
    return null;
  }

  return ReactDom.createPortal(
    <div className="modal">
      <div className="modal-content">
        <button onClick={onClose} className="close-button">
          Close
        </button>
        {children}
      </div>
    </div>,
    document.getElementById("portal")
  );
};
export default Modal;
