import { useEffect, useState } from "react";
import SaleCard from "../components/saleCard/saleCard";
import {
  CircularProgress,
  Drawer,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import styles from "./salesList.module.css";
import {
  ArrowBackIos,
  ArrowDropDown,
  ArrowDropUp,
  Close,
  Search,
  Tune,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { getSales } from "../api/getSales";
import { Sale } from "../types/types";

export default function SalesList() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [isFiltersDrawerOpen, setIsFiltersDrawerOpen] = useState(false);
  const [numSalesDisplayed, setNumSalesDisplayed] = useState(10);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [sortField, setSortField] = useState<
    "date" | "product" | "comment" | "total"
  >("date");
  const [isWineBusinessFilter, setIsWineBusinessFilter] =
    useState<boolean>(false);
  const [isRetailFilter, setIsRetailFilter] = useState<boolean>(false);

  useEffect(() => {
    async function fetchSales() {
      const newSales = await getSales();
      setSales(newSales);
      setLoading(false);
    }
    fetchSales();
  }, []);

  const filteredSales = sales.filter((sale) => {
    const commentMatch = sale.comment
      .toLowerCase()
      .includes(searchInput.toLowerCase());

    const isWineBusinessMatch = !isWineBusinessFilter || sale.isBusiness;

    const isWineRetailMatch = !isRetailFilter || !sale.isBusiness;

    return commentMatch && isWineBusinessMatch && isWineRetailMatch;
  });

  const sortedSales = [...filteredSales].sort((a, b) => {
    const aValue = a[sortField as keyof Sale];
    const bValue = b[sortField as keyof Sale];

    if (sortOrder === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const filteredSalesShown = sortedSales.slice(0, numSalesDisplayed);

  function handleFiltersDrawerOpen() {
    setIsFiltersDrawerOpen(true);
  }

  function handleFiltersDrawerClose() {
    setIsFiltersDrawerOpen(false);
  }

  function handleSort(field: "date" | "product" | "total" | "comment") {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  }

  const getArrowIcon = (field: "date" | "product" | "total" | "comment") => {
    if (field === sortField) {
      return sortOrder === "asc" ? <ArrowDropUp /> : <ArrowDropDown />;
    }
    return null;
  };

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
          <>
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
                <IconButton
                  className={styles.filtersBtn}
                  onClick={handleFiltersDrawerOpen}
                  color="primary"
                  sx={{
                    backgroundColor: "#5384c1",
                    color: "#fff",
                    borderRadius: "8px",
                    marginLeft: "8px",
                    "&:hover": {
                      backgroundColor: "#335c8e",
                    },
                  }}
                >
                  <Tune />
                </IconButton>
              </Grid>
              <Grid container className={styles.list}>
                <Grid container className={styles.tableHead}>
                  <Grid
                    item
                    xs={2}
                    onClick={() => handleSort("date")}
                    className={styles.columnHeaderWrapper}
                  >
                    <div className={styles.columnHeaderWrapper}>
                      <p>Ημερομηνία</p>
                      {getArrowIcon("date")}
                    </div>
                  </Grid>
                  <Grid item xs={2} className={styles.columnHeaderWrapper}>
                    <p>Ώρα</p>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    onClick={() => handleSort("product")}
                    className={styles.columnHeaderWrapper}
                  >
                    <div className={styles.columnHeaderWrapper}>
                      <p>Προϊόν</p>
                      {getArrowIcon("product")}
                    </div>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    onClick={() => handleSort("comment")}
                    className={styles.columnHeaderWrapper}
                  >
                    <div className={styles.columnHeaderWrapper}>
                      <p>Σχόλια</p>
                      {getArrowIcon("comment")}
                    </div>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    onClick={() => handleSort("total")}
                    className={styles.columnHeaderWrapper}
                  >
                    <div className={styles.columnHeaderWrapper}>
                      <p>Σύνολο</p>
                      {getArrowIcon("total")}
                    </div>
                  </Grid>
                </Grid>
                {filteredSalesShown?.map((sale: Sale) => (
                  <Grid item xs={12} key={sale._id}>
                    <SaleCard
                      sale={sale}
                      sales={sales}
                      setSales={setSales}
                      key={sale._id}
                    />
                  </Grid>
                ))}
                <button
                  className={styles.button}
                  onClick={() => setNumSalesDisplayed(numSalesDisplayed + 10)}
                >
                  Δείτε περισσότερα
                </button>
              </Grid>
            </Grid>
            <Drawer
              anchor="right"
              open={isFiltersDrawerOpen}
              onClose={handleFiltersDrawerClose}
              className={styles.drawer}
            >
              <div className={styles.closeDrawerWrapper}>
                <IconButton onClick={handleFiltersDrawerClose}>
                  <Close />
                </IconButton>
              </div>
              <h3 className={styles.drawerTitle}>Φίλτρα:</h3>
              <div className={styles.filtersBox}>
                <label>
                  <input
                    type="checkbox"
                    checked={isRetailFilter}
                    onChange={() => setIsRetailFilter(!isRetailFilter)}
                  />
                  Λιανική
                </label>
                <label className={styles.filterRight}>
                  <input
                    type="checkbox"
                    checked={isWineBusinessFilter}
                    onChange={() =>
                      setIsWineBusinessFilter(!isWineBusinessFilter)
                    }
                  />
                  Χονδρική
                </label>
              </div>
            </Drawer>
          </>
        )}
      </div>
    </main>
  );
}
