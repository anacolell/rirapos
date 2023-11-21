import { Grid, TextField } from "@mui/material";
import { useCart } from "../../context/cartContext";
import CartItem from "../cartItem/cartItem";
import styles from "./cart.module.css";
import { wines } from "../../data/wines";
import { calculateDiscount, formatPrice } from "../../utils/utils";
import { useState } from "react";
import {
  ShoppingBasketOutlined,
  LocalOffer,
  Percent,
} from "@mui/icons-material";
import WineTastingItem from "../wineTastingItem/wineTastingItem";

export default function Cart() {
  const { cartItems, wineTastings } = useCart();

  const [discountAmount, setDiscountAmount] = useState("");
  const [discount, setDiscount] = useState("");
  const [comment, setComment] = useState("");

  const isCartEmpty = cartItems.length <= 0 && wineTastings.length <= 0;

  const removeDiscount = () => {
    setDiscount("");
  };

  const winesInCart = cartItems.map((cartItem) => {
    const fullWineData = wines.find((wine) => wine.id === cartItem.id);
    return {
      ...fullWineData,
      quantity: cartItem.quantity,
    };
  });

  console.log(winesInCart);

  const sortedCartItems = cartItems.sort((a, b) => {
    const itemA = wines.find((wine) => wine.id === a.id);
    const itemB = wines.find((wine) => wine.id === b.id);

    const isWineInBoxA = itemA?.isWineInBox || false;
    const isWineInBoxB = itemB?.isWineInBox || false;

    const valueA = isWineInBoxA ? 1 : 0;
    const valueB = isWineInBoxB ? 1 : 0;

    return valueA - valueB;
  });

  const totalPriceWines = cartItems.reduce((total, cartItem) => {
    const item = wines.find((i) => i.id === cartItem.id);
    if (!item?.isWineInBox) {
      return total + (item?.price || 0) * cartItem.quantity;
    } else {
      return total + 0;
    }
  }, 0);

  const totalPriceIsWineInBoxWines = cartItems.reduce((total, cartItem) => {
    const item = wines.find((i) => i.id === cartItem.id);
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

  const total = discount
    ? discountedPrice + totalPriceIsWineInBoxWines + totalPriceTastings
    : totalPriceWines + totalPriceIsWineInBoxWines + totalPriceTastings;

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

    await fetch("http://localhost:5000/sales", {
      method: "POST",
      body: JSON.stringify({
        wines: winesInCart,
        wineTastings: wineTastings,
        discount: discount,
        discountDifference: discountDifference,
        subTotal: subtotal,
        total: total,
        comment: comment,
        date: new Date(),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
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
            <div className={styles.totalPriceWrapper}>
              <p className={styles.totalPriceTitle}>Σύνολο</p>
              <p className={styles.totalPriceAmount}>{formatPrice(total)} €</p>
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
  );
}
