import { useState } from "react";
import styles from "./wineTastingForm.module.css";
import { Grid, TextField } from "@mui/material";
import { useCart } from "../../context/cartContext";
import { Add } from "@mui/icons-material/";

export default function WineTastingForm() {
  const { addWineTasting } = useCart();
  const [price, setPrice] = useState("");
  const [numPeople, setNumPeople] = useState("");

  const handleDoneClick = () => {
    if (price && numPeople) {
      addWineTasting(Number(price), parseInt(numPeople, 10));
      setPrice("");
      setNumPeople("");
    }
  };

  return (
    <div className={styles.tastingFormWrapper}>
      <h3>Γευσιγνωσίες</h3>
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={12} md={5.5}>
          <TextField
            label="Τιμή"
            className={styles.tastingTextField}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            size="small"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={5.5}>
          <TextField
            label="Άτομα"
            className={styles.tastingTextField}
            value={numPeople}
            onChange={(e) => setNumPeople(e.target.value)}
            size="small"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={1}>
          <button onClick={handleDoneClick} className={styles.addTastingBtn}>
            <Add />
          </button>
        </Grid>
      </Grid>
    </div>
  );
}
