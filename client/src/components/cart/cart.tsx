import { AlertColor, Grid, TextField } from "@mui/material";
import { useCart } from "../../context/cartContext";
import CartItem from "../cartItem/cartItem";
import styles from "./cart.module.css";
import { wines } from "../../data/wines";
import { winesBusiness } from "../../data/winesBusiness";
import {
  calculateDiscount,
  calculateTax,
  formatPrice,
  getWineType,
} from "../../utils/utils";
import { useState } from "react";
import {
  ShoppingBasketOutlined,
  LocalOffer,
  Percent,
} from "@mui/icons-material";
import WineTastingItem from "../wineTastingItem/wineTastingItem";
import { createSale } from "../../api/createSale";
import CustomSnackbar from "../customSnackbar/customSnackbar";
import { Wine } from "../../types/types";

export default function Cart() {
  const { cartItems, wineTastings, resetFields, businessWinesChecked } =
    useCart();

  const wineList: Wine[] = businessWinesChecked ? winesBusiness : wines;

  const [discountAmount, setDiscountAmount] = useState("");
  const [discount, setDiscount] = useState("");
  const [comment, setComment] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] =
    useState<AlertColor>("success");

  const isCartEmpty = cartItems.length <= 0 && wineTastings.length <= 0;

  const emptyCart = () => {
    resetFields();
    setDiscount("");
    setComment("");
  };

  const removeDiscount = () => {
    setDiscount("");
  };

  const winesInCart: Wine[] = cartItems.map((cartItem) => {
    const fullWineData = wineList.find((wine) => wine.id === cartItem.id);
    return {
      id: fullWineData?.id || "",
      img: fullWineData?.img || "",
      title: fullWineData?.title || "",
      year: fullWineData?.year || "",
      price: fullWineData?.price || 0,
      wineType: fullWineData?.wineType || "",
      quantity: cartItem.quantity || 0,
      isWineInBox: fullWineData?.isWineInBox || false,
      volume: fullWineData?.volume || 0,
    };
  });

  const sortedCartItems = cartItems.sort((a, b) => {
    const itemA = wineList.find((wine) => wine.id === a.id);
    const itemB = wineList.find((wine) => wine.id === b.id);

    const isWineInBoxA = itemA?.isWineInBox || false;
    const isWineInBoxB = itemB?.isWineInBox || false;

    const valueA = isWineInBoxA ? 1 : 0;
    const valueB = isWineInBoxB ? 1 : 0;

    return valueA - valueB;
  });

  const totalPriceWines = cartItems.reduce((total, cartItem) => {
    const item = wineList.find((i) => i.id === cartItem.id);
    if (!item?.isWineInBox) {
      return total + (item?.price || 0) * cartItem.quantity;
    } else {
      return total + 0;
    }
  }, 0);

  const totalPriceIsWineInBoxWines = cartItems.reduce((total, cartItem) => {
    const item = wineList.find((i) => i.id === cartItem.id);
    if (item?.isWineInBox) {
      return total + (item?.price || 0) * cartItem.quantity;
    } else {
      return total + 0;
    }
  }, 0);

  const discountedPrice = discount
    ? totalPriceWines - calculateDiscount(totalPriceWines, Number(discount))
    : totalPriceWines;

  const discountDifference = totalPriceWines - discountedPrice;

  const totalPriceTastings = wineTastings.reduce((total, wineTasting) => {
    return total + wineTasting.price * wineTasting.quantity;
  }, 0);

  const subtotal =
    totalPriceWines + totalPriceIsWineInBoxWines + totalPriceTastings;

  const taxAmount = discount
    ? calculateTax(discountedPrice)
    : calculateTax(totalPriceWines);

  const total = discount
    ? discountedPrice +
      totalPriceIsWineInBoxWines +
      totalPriceTastings +
      (businessWinesChecked ? taxAmount : 0)
    : totalPriceWines +
      totalPriceIsWineInBoxWines +
      totalPriceTastings +
      (businessWinesChecked ? taxAmount : 0);

  const onlyWineInBox = winesInCart.every((wine) => wine.isWineInBox);

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const handleDiscountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newDiscount = event.target.value;
    newDiscount = newDiscount.replace(/\D/g, "");
    newDiscount = newDiscount.slice(0, 2);
    setDiscountAmount(newDiscount);
  };

  const handleApplyDiscount = () => {
    setDiscount(discountAmount);
    setDiscountAmount("");
  };

  const handleCreateSale = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const updatedWinesInCart = winesInCart.map((wine) => {
        if (wine.isWineInBox) {
          const updatedTitle = `${wine.title} ${wine.volume}Lt, ${getWineType(
            wine.wineType
          )}`;
          return { ...wine, title: updatedTitle };
        }
        return wine;
      });
      createSale(
        updatedWinesInCart,
        wineTastings,
        discount,
        discountDifference,
        subtotal,
        total,
        comment,
        businessWinesChecked
      );
      setSnackbarMessage("Η πώληση αποθηκεύτηκε με επιτυχία");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      emptyCart();
      emptyCart();
    } catch (error) {
      console.error("Error creating sale", error);
      setSnackbarMessage("Σφάλμα κατά την αποθήκευση της πώλησης");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleSnackbarClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <>
      <Grid
        container
        className={`${styles.cartWrapper} ${
          isCartEmpty && styles.cartWrapperEmpty
        }`}
        direction="column"
      >
        {isCartEmpty ? (
          <ShoppingBasketOutlined />
        ) : (
          <>
            {sortedCartItems.map((item) => (
              <CartItem key={item.id} {...item} discount={Number(discount)} />
            ))}
            {wineTastings.map((wineTasting) => (
              <WineTastingItem key={wineTasting.id} {...wineTasting} />
            ))}
            <Grid
              item
              xs={12}
              sx={{
                marginTop: "16px",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              {cartItems.length > 0 && (
                <div className={styles.discountContainer}>
                  <div className={styles.discountWrapper}>
                    <TextField
                      value={discountAmount}
                      onChange={handleDiscountChange}
                      className={styles.discountTextField}
                      placeholder="Έκπτωση"
                    />
                    <button
                      className={styles.applyDiscountBtn}
                      onClick={handleApplyDiscount}
                      disabled={Number(discountAmount) <= 0}
                    >
                      <Percent sx={{ fontSize: "20px" }} />
                    </button>
                  </div>
                  {discount && (
                    <div className={styles.discountTag}>
                      <LocalOffer sx={{ fontSize: "20px" }} />
                      <p>{discount}%</p>
                      <button
                        className={styles.removeDiscountBtn}
                        onClick={() => removeDiscount()}
                      >
                        &times;
                      </button>
                    </div>
                  )}
                </div>
              )}
            </Grid>
            <Grid item xs={12}>
              <div className={styles.invoiceDetailWrapper}>
                <p className={styles.invoiceDetailTitle}>Υποσύνολο</p>
                <p className={styles.invoiceDetailAmount}>
                  {formatPrice(subtotal)} €
                </p>
              </div>
              {discount && (
                <div className={styles.invoiceDetailWrapper}>
                  <p className={styles.invoiceDetailTitle}>
                    Έκπτωση ({discount}%)
                  </p>
                  <p className={styles.invoiceDetailAmount}>
                    {formatPrice(discountDifference)} €
                  </p>
                </div>
              )}
              {businessWinesChecked && !onlyWineInBox && (
                <div className={styles.invoiceDetailWrapper}>
                  <p className={styles.invoiceDetailTitle}>ΦΠΑ (24%)</p>
                  <p className={styles.invoiceDetailAmount}>
                    {formatPrice(taxAmount)} €
                  </p>
                </div>
              )}
              <div className={styles.totalPriceWrapper}>
                <p className={styles.totalPriceTitle}>Σύνολο</p>
                <p className={styles.totalPriceAmount}>
                  {formatPrice(total)} €
                </p>
              </div>
              <div>
                <p className={styles.commentLabel}>Σχόλια</p>
                <TextField
                  id="comment"
                  multiline
                  rows={2}
                  fullWidth
                  value={comment}
                  onChange={handleCommentChange}
                  className={styles.commentTextField}
                />
              </div>
              <button onClick={handleCreateSale} className={styles.saveBtn}>
                Αποθήκευση πώλησης
              </button>
            </Grid>
          </>
        )}
      </Grid>
      <CustomSnackbar
        open={openSnackbar}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        severity={snackbarSeverity}
      />
    </>
  );
}
