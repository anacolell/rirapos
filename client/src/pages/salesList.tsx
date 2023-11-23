import { useEffect, useState } from "react";
import SaleCard from "../components/saleCard/saleCard";
import { CircularProgress, Grid } from "@mui/material";
import styles from "./salesList.module.css";
import { ArrowBackIos } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { getSales } from "../api/getSales";

export type Sale = {
  _id: string;
  wineTastings: [{ price: number; id: string; quantity: number }];
  wines: [
    {
      id: string;
      title: string;
      img: string;
      year: string;
      price: number;
      quantity: number;
      isWineInBox: boolean;
      wineType: string;
      date: Date;
    }
  ];
  total: number;
  subtotal: number;
  discount: number;
  discountAmount: number;
  discountDifference: number;
  comment: string;
  date: Date;
};

export default function SalesList() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSales() {
      const newSales = await getSales();
      setSales(newSales);
      setLoading(false);
    }
    fetchSales();
  }, []);

  return (
    <main className={styles.pageWrapper}>
      <Link className={styles.goBackWrapper} to="/">
        <ArrowBackIos /> <p>POS</p>
      </Link>
      <div className={styles.listWrapper}>
        {loading ? (
          <CircularProgress className={styles.spinner} />
        ) : (
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
            {sales?.map((sale: Sale) => (
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
        )}
      </div>
    </main>
  );
}
