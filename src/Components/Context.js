import React, { createContext, useState } from "react";

export const Context = createContext();

export function ContextProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [swap, setSwap] = useState(true);
  function addToCart(data) {
    let extisting = cart.findIndex((obj) => obj.id === data.id);
    if (extisting!==-1) {
      const updatedCart = [...cart];
      updatedCart[extisting].quantity += 1;
    } else {
      setCart([...cart, data]);
    }
  }
  function IncreaseQuantity(id) {
    const existingIndex = cart.findIndex((obj) => obj.id === id);

    const updatedCart = [...cart];
    updatedCart[existingIndex].quantity += 1;
    setCart(updatedCart);
  }
  function DecreaseQuantity(id) {
    const existingIndex = cart.findIndex((obj) => obj.id === id);
    const updatedCart = [...cart];
    if (updatedCart[existingIndex].quantity == 1) {
      return;
    }
    updatedCart[existingIndex].quantity -= 1;
    setCart(updatedCart);
  }
  function DeleteProduct(id) {
    let newCart = cart.filter((el) => el.id !== id);
    setCart(newCart);
  }

  console.log(cart);
  return (
    <Context.Provider
      value={{
        cart,
        addToCart,
        swap,
        setSwap,
        DeleteProduct,
        DecreaseQuantity,
        IncreaseQuantity,
      }}
    >
      {children}
    </Context.Provider>
  );
}
