import dayjs from "dayjs";
import { formatPrice } from "../../utils/utils";
import { Card, CardContent, Grid, IconButton } from "@mui/material";
import styles from "./saleCard.module.css";
import { Delete, Edit, Visibility } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { deleteSale } from "../../api/deleteSale";
import { useState } from "react";
import ConfirmationDialog from "../confirmDialog/confirmDialog";
import { Sale } from "../../types/types";
import EditDialog from "../editDialog/editDialog";

type SaleCardProps = {
  sale: Sale;
  sales: Sale[];
  setSales: React.Dispatch<React.SetStateAction<Sale[]>>;
};

export default function SaleCard({ sale, sales, setSales }: SaleCardProps) {
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleEditClick = () => {
    setEditDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteSale(sale._id);
      setSales(sales.filter((saleItem) => sale._id !== saleItem._id));
    } catch (error) {
      console.error("Error deleting sale:", error);
    } finally {
      setDeleteDialogOpen(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };

  let product;

  if (sale.wines?.length > 0 && sale.wineTastings?.length > 0) {
    product = "Οίνος & Γευσιγνωσία";
  } else if (sale.wines?.length > 0 && sale.wineTastings?.length <= 0) {
    product = "Οίνος";
  } else {
    product = "Γευσιγνωσία";
  }

  return (
    <>
      <Card className={styles.transactionCard} elevation={0}>
        <CardContent className={styles.transactionCardContent}>
          <Grid container>
            <Grid item xs={2}>
              <p className={styles.saleData}>
                {dayjs(sale?.date).format("DD/MM/YYYY")}
              </p>
            </Grid>
            <Grid item xs={2}>
              <p className={styles.saleData}>
                {dayjs(sale?.date).format("HH:mm")}
              </p>
            </Grid>
            <Grid item xs={2}>
              <p className={styles.saleData}>{product}</p>
            </Grid>
            <Grid item xs={2} sx={{ paddingRight: "24px" }}>
              <p className={styles.saleDataComment}>{sale.comment}</p>
            </Grid>
            <Grid item xs={2}>
              <p className={styles.saleData}>{formatPrice(sale?.total)} €</p>
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
              <IconButton onClick={handleEditClick}>
                <Edit />
              </IconButton>
              <IconButton onClick={handleDeleteClick}>
                <Delete />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <ConfirmationDialog
        open={isDeleteDialogOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Διαγραφή Πώλησης"
        description="Είστε σίγουρος/η ότι θέλετε να διαγράψετε αυτή την πώληση;"
      />
      <EditDialog
        open={isEditDialogOpen}
        title="Επεξεργασία πώλησης"
        sale={sale}
        setEditDialogOpen={setEditDialogOpen}
        setSales={setSales}
      />
    </>
  );
}
