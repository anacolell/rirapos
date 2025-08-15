import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { Sale } from "../../types/types";
import CartItem from "../cartItem/cartItem";
import WineTastingItem from "../wineTastingItem/wineTastingItem";
import styles from "./editDialog.module.css";
import { updateSale } from "../../api/editSale";

type EditDialogProps = {
  open: boolean;
  title: string;
  sale: Sale;
  setEditDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSales: React.Dispatch<React.SetStateAction<Sale[]>>;
};

const EditDialog: React.FC<EditDialogProps> = ({
  open,
  title,
  sale,
  setEditDialogOpen,
  setSales,
}) => {
  const [updatedSale, setUpdatedSale] = useState<Sale>(sale);

  useEffect(() => {
    setUpdatedSale(sale);
  }, [sale]);

  const handleClose = () => {
    setEditDialogOpen(false);
  };

  const handleExited = () => {
    setUpdatedSale(sale);
  };

  const handleConfirm = async () => {
    try {
      await updateSale(sale._id, updatedSale);
      handleClose();
      setSales((prevSales: Sale[]) =>
        prevSales.map((saleItem) =>
          saleItem._id === sale._id ? updatedSale : saleItem
        )
      );
    } catch (error) {
      console.error("Error updating sale:", (error as Error).message);
    }
  };

  const handleCommentChange = (comment: string) => {
    setUpdatedSale((prevSale: Sale) => ({
      ...prevSale,
      comment: comment,
    }));
  };

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      TransitionProps={{ onExited: handleExited }}
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <Grid container className={styles.cartWrapper} direction="column">
          {updatedSale.wines.map((item) => (
            <CartItem
              key={item.id}
              {...item}
              discount={Number(sale.discount)}
              noDelete
            />
          ))}
          {updatedSale.wineTastings.map((wineTasting) => (
            <WineTastingItem key={wineTasting.id} {...wineTasting} />
          ))}
        </Grid>
        <TextField
          multiline
          value={updatedSale.comment}
          rows={2}
          fullWidth
          className={styles.commentTextField}
          sx={{ marginTop: "18px" }}
          onChange={(e) => handleCommentChange(e.target.value)}
        />
        <DialogActions sx={{ paddingRight: 0, paddingLeft: 0 }}>
          <button
            onClick={handleClose}
            className={`${styles.button} ${styles.cancelButton}`}
          >
            Ακύρωση
          </button>
          <button
            onClick={handleConfirm}
            className={`${styles.button} ${styles.confirmButton}`}
          >
            Αποθηκεύσετε
          </button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;
