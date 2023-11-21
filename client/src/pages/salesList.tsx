import { useEffect, useState } from "react";
import SaleCard from "../components/saleCard/saleCard";
import { Grid } from "@mui/material";
import styles from "./salesList.module.css";
import { ArrowBackIos } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function SalesList() {
  const [sales, setSales] = useState([]);
  useEffect(() => {
    async function fetchSales() {
      const response = await fetch("http://localhost:5000/sales");
      const newSales = await response.json();
      setSales(newSales);
    }
    fetchSales();
  }, []);

  return (
    <main className={styles.pageWrapper}>
      <Link className={styles.goBackWrapper} to="/">
        <ArrowBackIos /> <p>Back to POS</p>
      </Link>
      <div className={styles.listWrapper}>
        <Grid container className={styles.list}>
          <Grid container className={styles.tableHead}>
            <Grid item xs={2.5}>
              <p>Date</p>
            </Grid>
            <Grid item xs={2.5}>
              <p>Time</p>
            </Grid>
            <Grid item xs={2.5}>
              <p>Product</p>
            </Grid>
            <Grid item xs={2.5}>
              <p>Total</p>
            </Grid>
          </Grid>
          {sales?.map((sale: any) => (
            <Grid item xs={12}>
              <SaleCard
                sale={sale}
                sales={sales}
                setSales={setSales}
                key={sale._id}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </main>
  );
}
