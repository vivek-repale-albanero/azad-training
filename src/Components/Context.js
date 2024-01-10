import React, { createContext, useState } from "react";

export const Context = createContext();

export function ContextProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [swap, setSwap] = useState(true);
  const [products, setProducts] = useState([]);
  const [sidebarWidth, setSidebarWidth] = useState(true);
  function addToCart(data) {
    let extisting = cart.findIndex((obj) => obj.id === data.id);
    if (extisting !== -1) {
      const updatedCart = [...cart];
      updatedCart[extisting].quantity += 1;
      updatedCart[extisting].stock -= 1;
    } else {
      setCart([...cart, { ...data, stock: data.stock - 1 }]);
    }
  }
  function IncreaseQuantity(id) {
    const existingIndex = cart.findIndex((obj) => obj.id === id);

    const updatedCart = [...cart];
    updatedCart[existingIndex].quantity += 1;
    updatedCart[existingIndex].stock -= 1;   
    setCart(updatedCart);
  }
  function DecreaseQuantity(id) {
    const existingIndex = cart.findIndex((obj) => obj.id === id);
    const updatedCart = [...cart];
    if (updatedCart[existingIndex].quantity == 1) {
      return;
    }
    updatedCart[existingIndex].quantity -= 1;
    updatedCart[existingIndex].stock += 1;   

    setCart(updatedCart);
  }
  function DeleteProduct(id) {
    let newCart = cart.filter((el) => el.id !== id);
    setCart(newCart);
  }
  function BuyNow(){
    for(let i=0;i<cart.length;i++){
      ManageStock(cart[i].id,cart[i].stock)
    }
    setCart([])
  }
  function ManageStock(id, payload) {
    console.log(id, payload);
    fetch(`http://localhost:8080/products/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ stock:  payload }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setSwap(!swap);
        console.log("PATCH request successful:", data);
      })
      .catch((error) => {
        console.error("Error making PATCH request:", error);
      });
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
        products,
        setProducts,
        ManageStock,BuyNow , sidebarWidth, setSidebarWidth    }}
    >
      {children}
    </Context.Provider>
  );
}
