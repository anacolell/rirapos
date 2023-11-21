import dayjs from "dayjs";
import { formatPrice } from "../../utils/utils";
import {
  Card,
  CardContent,
  Grid,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import styles from "./saleCard.module.css";
import { Delete, MoreVert, Visibility } from "@mui/icons-material";
import { useState } from "react";

export default function SaleCard({ sale }: any) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSeeDetails = () => {
    console.log("details");
  };

  const handleDelete = () => {
    console.log("delete");
  };

  let product;

  if (sale.wines?.length > 0 && sale.wineTastings?.length > 0) {
    product = "Wine & tasting";
  } else if (sale.wines?.length > 0 && sale.wineTastings?.length === 0) {
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
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <IconButton>
              <Visibility />
            </IconButton>
            <IconButton>
              <Delete />
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
    // <div>
    //   <p>{dayjs(sale?.date).format("DD/MM/YYYY")}</p>
    //   <p>{dayjs(sale?.date).format("HH:mm")}</p>
    //   <p>{formatPrice(sale?.total)} €</p>
    //   <p>{product}</p>
    // </div>
  );
}
