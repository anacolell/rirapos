import { Grid } from "@mui/material";
import { wines } from "../data/wines";
import WineBox from "../components/wineBox/wineBox";
import { Link } from "react-router-dom";
import styles from "./pos.module.css";
import Cart from "../components/cart/cart";
import WineTastingForm from "../components/wineTastingForm/wineTastingForm";
import { List } from "@mui/icons-material";
import { API_URL } from "../api/config";

export default function Pos() {
  return (
    <main className={styles.pageWrapper}>
      <Grid container spacing={6} className={styles.posWrapper}>
        <Grid
          item
          xs={12}
          sx={{
            marginTop: "56px",
            marginBottom: "20px",
            textAlign: "right",
          }}
        >
          <Link className={styles.link} to="/sales">
            <List /> Λίστα πωλήσεων
          </Link>
        </Grid>
        <Grid item xs={12} lg={8}>
          <Grid container spacing={3} className={styles.productsListWrapper}>
            {wines.map((wine) => (
              <WineBox key={wine.id} wine={wine} />
            ))}
          </Grid>
          <WineTastingForm />
        </Grid>
        <Grid item xs={12} lg={4} style={{ paddingTop: "42px" }}>
          <Cart />
        </Grid>
      </Grid>
    </main>
  );
}
