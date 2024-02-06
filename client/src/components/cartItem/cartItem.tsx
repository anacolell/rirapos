import { Grid } from "@mui/material";
import { useCart } from "../../context/cartContext";
import { wines } from "../../data/wines";
import { winesBusiness } from "../../data/winesBusiness";
import styles from "./cartItem.module.css";
import { calculateDiscount, formatPrice, getWineType } from "../../utils/utils";
import { Package } from "react-feather";

type CartItemProps = {
  id: string;
  quantity: number;
  discount: number | null;
  noDelete?: boolean;
};

export default function CartItem({
  id,
  quantity,
  discount,
  noDelete,
}: CartItemProps) {
  const { removeFromCart, businessWinesChecked } = useCart();
  const wineList = businessWinesChecked ? winesBusiness : wines;
  const item = wineList.find((i) => i.id === id);
  if (item === null) return null;

  const formattedPrice = item && formatPrice(item.price);
  const totalItemPrice = (item && item.price * quantity) || 0;
  const totalItemPriceFormatted = formatPrice(totalItemPrice);

  const discountDifference =
    (item?.price &&
      discount &&
      totalItemPrice - calculateDiscount(totalItemPrice, discount)) ||
    0;

  return (
    <Grid item xs={12} className={styles.cartWrapper}>
      <div className={styles.itemLeft}>
        {item?.isWineInBox ? (
          <Package className={styles.packageIcon} />
        ) : (
          <img src={`/images/${item?.img}`} className={styles.itemImage} />
        )}
        <div className={styles.itemInfoWrapper}>
          <p className={styles.itemTitle}>
            {item?.isWineInBox
              ? `${item?.title} ${item?.volume}Lt, ${getWineType(
                  item?.wineType
                )}`
              : item?.title}
            {quantity > 1 && (
              <span className={styles.itemQuantity}>x{quantity}</span>
            )}
          </p>
          <p className={styles.itemPrice}>{formattedPrice}</p>
        </div>
      </div>
      <div className={styles.itemRight}>
        {discount && !item?.isWineInBox ? (
          <>
            <p className={styles.totalItemPriceCrossed}>
              {totalItemPriceFormatted} €
            </p>
            <p>{formatPrice(discountDifference)} €</p>
          </>
        ) : (
          <p>{totalItemPriceFormatted} €</p>
        )}
        {!noDelete && (
          <button
            className={styles.deleteBtn}
            onClick={() => item?.id && removeFromCart(item.id)}
          >
            &times;
          </button>
        )}
      </div>
    </Grid>
  );
}
