import { Grid } from "@mui/material";
import styles from "./wineTastingItem.module.css";
import { formatPrice } from "../../utils/utils";
import { useCart } from "../../context/cartContext";

type WineTastingItemProps = {
  id: string;
  quantity: number;
  price: number;
};

export default function WineTastingItem({
  id,
  quantity,
  price,
}: WineTastingItemProps) {
  const { deleteWineTasting } = useCart();
  const formattedPrice = formatPrice(price);
  const totalItemPrice = formatPrice(price * quantity);

  return (
    <Grid item xs={12} className={styles.cartWrapper}>
      <div className={styles.itemLeft}>
        <div className={styles.itemInfoWrapper}>
          <p className={styles.itemTitle}>
            Γευσιγνωσία
            {quantity > 1 && (
              <span className={styles.itemQuantity}>x{quantity}</span>
            )}
          </p>
          <p className={styles.itemPrice}>{formattedPrice}</p>
        </div>
      </div>
      <div className={styles.itemRight}>
        <p>{totalItemPrice} €</p>
        <button
          className={styles.deleteBtn}
          onClick={() => deleteWineTasting(id)}
        >
          &times;
        </button>
      </div>
    </Grid>
  );
}
