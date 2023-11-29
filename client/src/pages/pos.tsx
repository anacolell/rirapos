import { Grid, Stack, Switch, Typography } from "@mui/material";
import { wines } from "../data/wines";
import { winesBusiness } from "../data/winesBusiness";
import WineBox from "../components/wineBox/wineBox";
import { Link } from "react-router-dom";
import styles from "./pos.module.css";
import Cart from "../components/cart/cart";
import WineTastingForm from "../components/wineTastingForm/wineTastingForm";
import { List } from "@mui/icons-material";
import { useCart } from "../context/cartContext";

export default function Pos() {
  const { businessWinesChecked, setBusinessWinesChecked } = useCart();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBusinessWinesChecked(event.target.checked);
  };

  const selectedWines = businessWinesChecked ? winesBusiness : wines;

  const selectedWinesBottle = selectedWines.filter((wine) => !wine.isWineInBox);
  const selectedWinesInBox = selectedWines.filter((wine) => wine.isWineInBox);

  return (
    <main className={styles.pageWrapper}>
      <Grid container spacing={6} className={styles.posWrapper}>
        <Grid item xs={12} md={6}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography>Λιανική</Typography>
            <Switch
              className={styles.switch}
              checked={businessWinesChecked}
              onChange={handleChange}
              disableRipple
            />
            <Typography>Χονδρική</Typography>
          </Stack>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            textAlign: "right",
          }}
        >
          <div className={styles.link}>
            <Link className={styles.linkText} to="/sales">
              <List /> Λίστα πωλήσεων
            </Link>
          </div>
        </Grid>
        <Grid item xs={12} lg={8}>
          <Grid container spacing={3} className={styles.productsListWrapper}>
            {selectedWinesBottle.map((wine) => (
              <WineBox key={wine.id} wine={wine} />
            ))}
          </Grid>
          <Grid container spacing={3} className={styles.productsListWrapper}>
            {selectedWinesInBox.map((wine) => (
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
