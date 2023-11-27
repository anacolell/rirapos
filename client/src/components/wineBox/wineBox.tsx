import { Grid } from "@mui/material";
import styles from "./wineBox.module.css";
import { useCart } from "../../context/cartContext";
import { Package } from "react-feather";
import { formatPrice } from "../../utils/utils";

interface Wine {
  id: string;
  title: string;
  img?: string;
  year: string;
  price: number;
  wineType: string;
  quantity?: number;
  isWineInBox?: boolean;
}

export default function WineBox({ wine }: { wine: Wine }) {
  const {
    getItemQuantity,
    setCartQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
  } = useCart();

  const quantity = getItemQuantity(wine.id);

  let wineType;

  if (wine.wineType === "red") {
    wineType = "Ερυθρός";
  } else if (wine.wineType === "white") {
    wineType = "Λευκός";
  } else {
    wineType = "Ροζέ";
  }

  return (
    <Grid item xs={12} sm={4} key={wine.id}>
      <div
        className={`${styles.wineBoxWrapper}
          ${quantity > 0 && styles.wineBoxWrapperSelected}
        `}
      >
        {wine.isWineInBox ? (
          <Package
            style={{
              width: "auto",
              height: "80px",
              marginTop: "60px",
              marginBottom: "60px",
              fontWeight: "200",
            }}
          />
        ) : (
          <img
            src={`/images/${wine.img}`}
            alt={wine.title}
            style={{ width: "auto", height: "200px" }}
          />
        )}

        <div className={styles.wineInfoWrapper}>
          {wine.isWineInBox ? (
            <div>
              <p className={styles.wineTitle}>
                {wine.title} {!wine.isWineInBox && wine.year}
              </p>
              <p className={styles.wineInBoxSubTitle}>
                {wine.quantity} Lt, {wineType}
              </p>
            </div>
          ) : (
            <p className={styles.wineTitle}>
              {wine.title} {!wine.isWineInBox && wine.year}
            </p>
          )}
          <div className={styles.priceInputWrapper}>
            <p>{formatPrice(wine.price)} €</p>
            {quantity === 0 ? (
              <button
                className={styles.addBtn}
                onClick={() => increaseCartQuantity(wine.id)}
              >
                +
              </button>
            ) : (
              <div className={styles.quantityInputWrapper}>
                <button
                  onClick={() => decreaseCartQuantity(wine.id)}
                  className={styles.quantityInputBtn}
                >
                  -
                </button>
                <input
                  onChange={(e) =>
                    setCartQuantity(wine.id, Number(e.target.value))
                  }
                  className={styles.quantity}
                  value={quantity}
                />
                <button
                  onClick={() => increaseCartQuantity(wine.id)}
                  className={styles.quantityInputBtn}
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Grid>
  );
}
