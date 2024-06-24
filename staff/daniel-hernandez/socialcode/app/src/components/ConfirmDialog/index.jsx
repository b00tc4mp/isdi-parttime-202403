import React, { useRef, useEffect } from "react";
import styles from "./index.module.css";
import Button from "../atomic/Button.jsx";

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
        <Button className={styles.cancelButton} onClick={onCancel}>
          Cancel
        </Button>
        <Button className={styles.okButton} onClick={onConfirm}>
          OK
        </Button>
      </dialog>
    </div>
  );
}

export default ConfirmDialog;
