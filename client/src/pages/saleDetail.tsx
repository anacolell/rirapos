import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./saleDetails.module.css";
import { CircularProgress, Grid } from "@mui/material";
import dayjs from "dayjs";
import { calculateAndFormatDiscountedPrice, formatPrice } from "../utils/utils";
import { ArrowBackIos } from "@mui/icons-material";
import { Sale } from "./salesList";
import { WineTasting } from "../context/cartContext";
import { getSales } from "../api/getSales";

export type Wine = {
  id: string;
  img: string;
  title: string;
  year: string;
  price: number;
  wineType: string;
  quantity: number;
  isWineInBox: boolean;
};

export default function SaleDetail() {
  const { saleId } = useParams();
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);

  const sale = sales.find((sale: Sale) => sale._id === saleId);

  useEffect(() => {
    async function fetchSales() {
      const newSales = await getSales();
      setSales(newSales);
      setLoading(false);
    }
    fetchSales();
  }, []);

  return (
    <main className={styles.detailsPageWrapper}>
      <Link className={styles.goBackWrapper} to="/sales">
        <ArrowBackIos /> <p>Λίστα πωλήσεων</p>
      </Link>
      {loading ? (
        <div className={styles.spinnerWrapper}>
          <CircularProgress />
        </div>
      ) : (
        <Grid
          container
          justifyContent="center"
          spacing={2}
          className={styles.detailsContainer}
          sx={{
            margin: "0 auto",
            width: "100%",
            "@media (min-width: 1000px)": {
              width: "50%",
            },
          }}
        >
          <Grid container>
            <Grid item xs={12} sm={5}>
              <p className={styles.productDetailsTitle}>Ημερομηνία</p>
            </Grid>
            <Grid item xs={12} sm={7}>
              <p>{dayjs(sale?.date).format("DD/MM/YYYY")}</p>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} sm={5}>
              <p className={styles.productDetailsTitle}>Ώρα</p>
            </Grid>
            <Grid item xs={12} sm={7}>
              <p>{dayjs(sale?.date).format("HH:mm")}</p>
            </Grid>
          </Grid>
          <Grid container sx={{ marginTop: "8px", marginBottom: "8px" }}>
            <Grid item xs={12} sm={5}>
              <p className={styles.productDetailsTitle}>Προϊόντα</p>
            </Grid>
            <Grid item xs={12} sm={7}>
              {sale && sale?.wines?.length > 0 && (
                <>
                  {sale?.wines?.map((wine: Wine) => (
                    <div className={styles.productDetails} key={wine.id}>
                      <p className={styles.wineDetailsLeft}>
                        {wine.title}
                        <span className={styles.productQuantity}>
                          x{wine.quantity}
                        </span>
                      </p>
                      {sale.discount && !wine.isWineInBox ? (
                        <div className={styles.discountedPriceWrapper}>
                          <p className={styles.totalItemPriceCrossed}>
                            {formatPrice(wine.quantity * wine.price)} €
                          </p>
                          <p>
                            {calculateAndFormatDiscountedPrice(
                              wine.quantity,
                              wine.price,
                              sale.discount
                            )}
                            €
                          </p>
                        </div>
                      ) : (
                        <p>{formatPrice(wine.quantity * wine.price)} €</p>
                      )}
                    </div>
                  ))}
                </>
              )}
              {sale && sale?.wineTastings?.length > 0 && (
                <>
                  {sale?.wineTastings?.map((wineTasting: WineTasting) => (
                    <div className={styles.productDetails} key={wineTasting.id}>
                      <p>
                        Γευσιγνωσία
                        <span className={styles.productQuantity}>
                          x{wineTasting.quantity}
                        </span>
                      </p>
                      <p>{wineTasting.price} €</p>
                    </div>
                  ))}
                </>
              )}
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12} sm={5}>
              <p className={styles.productDetailsTitle}>Υποσύνολο</p>
            </Grid>
            <Grid item xs={12} sm={7}>
              <p>{sale && formatPrice(sale?.subtotal)} €</p>
            </Grid>
          </Grid>
          {sale?.discount && (
            <Grid container>
              <Grid item xs={12} sm={5}>
                <p className={styles.productDetailsTitle}>
                  Έκπτωση ({sale?.discount}%)
                </p>
              </Grid>
              <Grid item xs={12} sm={7}>
                <p>{formatPrice(sale?.discountDifference)} €</p>
              </Grid>
            </Grid>
          )}
          <Grid container sx={{ marginTop: "8px" }}>
            <Grid item xs={12} sm={5}>
              <p className={styles.productDetailsTotalTitle}>Σύνολο</p>
            </Grid>
            <Grid item xs={12} sm={7}>
              <p className={styles.productDetailsTotal}>
                {sale && formatPrice(sale?.total)} €
              </p>
            </Grid>
          </Grid>
          {sale?.comment && (
            <Grid container>
              <Grid item xs={12} sm={5}>
                <p className={styles.productDetailsTitle}>Σχόλια</p>
              </Grid>
              <Grid item xs={12} sm={7}>
                <p>{sale?.comment}</p>
              </Grid>
            </Grid>
          )}
        </Grid>
      )}
    </main>
  );
}
