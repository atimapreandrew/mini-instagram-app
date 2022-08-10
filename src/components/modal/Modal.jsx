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
            <h5 className={styles.heading}>
              {props.id === "bio" ? "Delete All Photos" : "Delete Photo"}
            </h5>
          </div>
          <div
            className={styles.closeBtn}
            onClick={() => props.setIsOpen(false)}
          >
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </div>
          <div className={styles.modalContent}>
            {props.id === "bio"
              ? "Are you sure you want to delete all Photos?"
              : "Are you sure you want to delete this Photo?"}
          </div>
          <div className={styles.modalActions}>
            <div>
              <button className={styles.deleteBtn} onClick={props.deleteBtn}>
                Yes, please
              </button>
            </div>

            <div>
              <button
                className={styles.cancelBtn}
                onClick={() => props.setIsOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
