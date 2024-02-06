import { ReactNode, createContext, useContext, useState } from "react";
import { generateUniqueId } from "../utils/utils";
import { WineTasting } from "../types/types";

type CartProviderProps = {
  children: ReactNode;
};

type CartContext = {
  getItemQuantity: (id: string) => number;
  setCartQuantity: (id: string, newQuantity: number) => void;
  increaseCartQuantity: (id: string) => void;
  decreaseCartQuantity: (id: string) => void;
  removeFromCart: (id: string) => void;
  cartQuantity: number;
  cartItems: CartItem[];
  wineTastings: WineTasting[];
  addWineTasting: (price: number, quantity: number) => void;
  deleteWineTasting: (id: string) => void;
  resetFields: () => void;
  businessWinesChecked: boolean;
  setBusinessWinesChecked: (value: boolean) => void;
};

type CartItem = {
  id: string;
  quantity: number;
};

const CartContext = createContext({} as CartContext);

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }: CartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wineTastings, setWineTastings] = useState<WineTasting[]>([]);
  const [businessWinesChecked, setBusinessWinesChecked] = useState(false);

  function getItemQuantity(id: string) {
    return cartItems?.find((item) => item.id === id)?.quantity || 0;
  }

  function setCartQuantity(id: string, newQuantity: number) {
    setCartItems((currItems) => {
      return currItems?.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: newQuantity };
        } else {
          return item;
        }
      });
    });
  }

  function increaseCartQuantity(id: string) {
    setCartItems((currItems) => {
      if (currItems?.find((item: CartItem) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems?.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function decreaseCartQuantity(id: string) {
    setCartItems((currItems) => {
      if (currItems?.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems?.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeFromCart(id: string) {
    setCartItems((currItems) => {
      return currItems?.filter((item) => item.id !== id);
    });
  }

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  function addWineTasting(price: number, quantity: number) {
    const newWineTasting: WineTasting = {
      id: generateUniqueId(), // generate a unique id for each tasting
      price,
      quantity,
    };

    setWineTastings((prevWineTastings) => [
      ...prevWineTastings,
      newWineTasting,
    ]);
  }

  function deleteWineTasting(id: string) {
    setWineTastings((prevWineTastings) =>
      prevWineTastings.filter((wt) => wt.id !== id)
    );
  }

  const resetFields = () => {
    setCartItems([]);
    setWineTastings([]);
  };

  return (
    <CartContext.Provider
      value={{
        getItemQuantity,
        setCartQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cartItems,
        cartQuantity,
        wineTastings,
        addWineTasting,
        deleteWineTasting,
        resetFields,
        businessWinesChecked,
        setBusinessWinesChecked,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
