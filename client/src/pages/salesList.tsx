import { useEffect, useState } from "react";
import SaleCard from "../components/saleCard/saleCard";
import {
  CircularProgress,
  Grid,
  InputAdornment,
  TextField,
} from "@mui/material";
import styles from "./salesList.module.css";
import { ArrowBackIos, Search } from "@mui/icons-material";
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
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    async function fetchSales() {
      const newSales = await getSales();
      setSales(newSales);
      setLoading(false);
    }
    fetchSales();
  }, []);

  const filteredSales = sales.filter((sale) => {
    return sale.comment.toLowerCase().includes(searchInput.toLowerCase());
  });

  return (
    <main className={styles.pageWrapper}>
      <Link className={styles.goBackWrapper} to="/">
        <ArrowBackIos /> <p>POS</p>
      </Link>
      <div className={styles.listWrapper}>
        {loading ? (
          <CircularProgress className={styles.spinner} />
        ) : sales.length <= 0 ? (
          <p>Δεν υπάρχουν ακόμη πωλήσεις</p>
        ) : (
          <Grid container>
            <Grid
              item
              xs={12}
              textAlign={"right"}
              sx={{ marginBottom: "24px" }}
            >
              <TextField
                onChange={(e) => setSearchInput(e.target.value)}
                value={searchInput}
                size="small"
                className={styles.textfield}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid container className={styles.list}>
              <Grid container className={styles.tableHead}>
                <Grid item xs={2}>
                  <p>Ημερομηνία</p>
                </Grid>
                <Grid item xs={2}>
                  <p>Ώρα</p>
                </Grid>
                <Grid item xs={2}>
                  <p>Προϊόν</p>
                </Grid>
                <Grid item xs={2}>
                  <p>Σχόλια</p>
                </Grid>
                <Grid item xs={2}>
                  <p>Σύνολο</p>
                </Grid>
              </Grid>
              {filteredSales?.map((sale: Sale) => (
                <Grid item xs={12} key={sale._id}>
                  <SaleCard
                    sale={sale}
                    sales={sales}
                    setSales={setSales}
                    key={sale._id}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        )}
      </div>
    </main>
  );
}
