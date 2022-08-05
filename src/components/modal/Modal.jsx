import React from "react";
import styles from "./Modal.module.css";
import { RiCloseLine } from "react-icons/ri";

function Modal(props) {
  return (
    <>
      <div className={styles.darkBG} onClick={() => props.setIsOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>Delete Photo</h5>
          </div>
          <div
            className={styles.closeBtn}
            onClick={() => props.setIsOpen(false)}
          >
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </div>
          <div className={styles.modalContent}>
            Are you sure you want to delete this Photo?
          </div>
          <div className={styles.modalActions}>
            <button className={styles.deleteBtn} onClick={props.deleteBtn}>
              Delete
            </button>
            <button
              className={styles.cancelBtn}
              onClick={() => props.setIsOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
