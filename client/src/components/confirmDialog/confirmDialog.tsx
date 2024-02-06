import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import styles from "./confirmDialog.module.css";
type ConfirmationDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
};

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  description,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
        <DialogActions
          sx={{ paddingRight: 0, paddingLeft: 0, paddingTop: "12px" }}
        >
          <button
            onClick={onClose}
            className={`${styles.button} ${styles.cancelButton}`}
          >
            Ακύρωση
          </button>
          <button
            onClick={onConfirm}
            autoFocus
            className={`${styles.button} ${styles.confirmButton}`}
          >
            Επιβεβαίωση
          </button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDialog;
