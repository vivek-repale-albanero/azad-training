import { Box, Button, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import { Context } from "./Context";
import "./ShoppingCart.scss";
const ShoppingCart = () => {
  const { cart, IncreaseQuantity, DecreaseQuantity, DeleteProduct } =
    useContext(Context);
  const total = cart.reduce((acc, el) => acc + el.quantity * el.off_price, 0);
  if (cart.length == 0) {
    return <Box className="no">No products in the cart</Box>;
  }
  return (
    <Box className="cart">
      {cart.map((el) => {
        return (
          <Box key={el.id} className="cartCard">
            <Box>
              <img src={el.images.image1} alt="cart" />
            </Box>
            <Box>
              <Typography className="heading">{el.title}</Typography>
              <p>$ {el.off_price}</p>
              <Box>
                <Button
                  onClick={() => DecreaseQuantity(el.id)}
                  variant="outlined"
                >
                  -
                </Button>{" "}
                {el.quantity}{" "}
                <Button
                  onClick={() => IncreaseQuantity(el.id)}
                  variant="outlined"
                >
                  +
                </Button>
              </Box>
              <Box className="box">
                <Button
                  onClick={() => DeleteProduct(el.id)}
                  className="delete"
                  variant="contained"
                  color="red"
                >
                  Delete
                </Button>
                <Box>Total:-{el.quantity*el.off_price}</Box>
              </Box>
            </Box>
          </Box>
        );
      })}
      <Typography className="bill">Total Amount :- $ {total}</Typography>
    </Box>
  );
};

export default ShoppingCart;
