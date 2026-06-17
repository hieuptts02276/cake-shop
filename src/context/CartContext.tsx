import {
createContext,
useContext,
useState,
type ReactNode
} from "react";

import type { Cake } from "../interfaces/Cake";

export interface CartItem
extends Cake {
quantity: number;
}

interface CartContextType {
cart: CartItem[];

addToCart: (
cake: Cake
) => void;

removeFromCart: (
id: number
) => void;

clearCart: () => void;

totalPrice: number;
}

const CartContext =
createContext<CartContextType>(
{} as CartContextType
);

export function CartProvider({
children
}: {
children: ReactNode;
}) {
const [cart, setCart] =
useState<CartItem[]>(() => {
const saved =
localStorage.getItem(
"cart"
);


  return saved
    ? JSON.parse(saved)
    : [];
});


const saveCart = (
newCart: CartItem[]
) => {
setCart(newCart);


localStorage.setItem(
  "cart",
  JSON.stringify(newCart)
);


};

const addToCart = (
cake: Cake
) => {
const existing =
cart.find(
(c) =>
c.id === cake.id
);


if (existing) {
  const updated =
    cart.map((item) =>
      item.id === cake.id
        ? {
            ...item,
            quantity:
              item.quantity +
              1
          }
        : item
    );

  saveCart(updated);
} else {
  saveCart([
    ...cart,
    {
      ...cake,
      quantity: 1
    }
  ]);
}


};

const removeFromCart = (
id: number
) => {
saveCart(
cart.filter(
(c) =>
c.id !== id
)
);
};

const clearCart =
() => {
saveCart([]);
};

const totalPrice =
cart.reduce(
(
sum,
item
) =>
sum +
item.price *
item.quantity,
0
);

return (
<CartContext.Provider
value={{
cart,
addToCart,
removeFromCart,
clearCart,
totalPrice
}}
>
{children}
</CartContext.Provider>
);
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = (): CartContextType => {
  return useContext(
    CartContext
  );
};
