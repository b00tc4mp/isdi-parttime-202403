import React, { useRef, useEffect } from "react";
import styles from "./ConfirmDialog.module.css";

function ConfirmDialog({ dialog, onConfirm, onCancel }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialogNode = dialogRef.current;
    if (dialogNode) {
      dialogNode.showModal();
    }

    return () => {
      if (dialogNode) {
        dialogNode.close();
      }
    };
  }, []);

  return (
    <div className={styles.dialogOverlay}>
      <dialog className={styles.confirmDialog} ref={dialogRef}>
        <p className={styles.dialogParagraph}>{dialog}</p>
        <button className={styles.cancelButton} autoFocus onClick={onCancel}>
          Cancel
        </button>
        <button className={styles.okButton} onClick={onConfirm}>
          OK
        </button>
      </dialog>
    </div>
  );
}

export default ConfirmDialog;
