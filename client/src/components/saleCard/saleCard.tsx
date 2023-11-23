import dayjs from "dayjs";
import { formatPrice } from "../../utils/utils";
import { Card, CardContent, Grid, IconButton } from "@mui/material";
import styles from "./saleCard.module.css";
import { Delete, Visibility } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { Sale } from "../../pages/salesList";
import { deleteSale } from "../../api/deleteSale";

type SaleCardProps = {
  sale: Sale;
  sales: Sale[];
  setSales: React.Dispatch<React.SetStateAction<Sale[]>>;
};

export default function SaleCard({ sale, sales, setSales }: SaleCardProps) {
  const handleDelete = async (saleId: string) => {
    await deleteSale(saleId);
    setSales(sales.filter((sale) => saleId !== sale._id));
  };

  let product;

  if (sale.wines?.length > 0 && sale.wineTastings?.length > 0) {
    product = "Wine & tasting";
  } else if (sale.wines?.length > 0 && sale.wineTastings?.length <= 0) {
    product = "Wine";
  } else {
    product = "Tasting";
  }

  return (
    <Card className={styles.transactionCard} elevation={0}>
      <CardContent className={styles.transactionCardContent}>
        <Grid container>
          <Grid item xs={2.5}>
            <p className={styles.saleData}>
              {dayjs(sale?.date).format("DD/MM/YYYY")}
            </p>
          </Grid>
          <Grid item xs={2.5}>
            <p className={styles.saleData}>
              {dayjs(sale?.date).format("HH:mm")}
            </p>
          </Grid>
          <Grid item xs={2.5}>
            <p className={styles.saleData}>{product}</p>
          </Grid>
          <Grid item xs={2.5}>
            <p className={styles.saleData}>
              <p>{formatPrice(sale?.total)} €</p>
            </p>
          </Grid>
          <Grid
            item
            xs={2}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Link to={`/sales/${sale._id}`}>
              <IconButton>
                <Visibility />
              </IconButton>
            </Link>
            <IconButton>
              <Delete onClick={() => handleDelete(sale._id)} />
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
