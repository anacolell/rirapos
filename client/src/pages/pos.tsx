import { Grid } from "@mui/material";
import { wines } from "../data/wines";
import WineBox from "../components/wineBox/wineBox";
import { Link } from "react-router-dom";
import styles from "./pos.module.css";
import Cart from "../components/cart/cart";
import WineTastingForm from "../components/wineTastingForm/wineTastingForm";

export default function Pos() {
  return (
    <main className={styles.pageWrapper}>
      <Grid container spacing={6} className={styles.posWrapper}>
        <Grid item xs={12}>
          <Link className={styles.link} to="/sales-list">
            Sales list
          </Link>
        </Grid>
        <Grid item xs={12} md={8}>
          <Grid container spacing={3} className={styles.productsListWrapper}>
            {wines.map((wine) => (
              <WineBox key={wine.id} wine={wine} />
            ))}
          </Grid>
          <WineTastingForm />
        </Grid>
        <Grid item xs={12} md={4} style={{ paddingTop: "42px" }}>
          <Cart />
        </Grid>
      </Grid>
    </main>
  );
}
