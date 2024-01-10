import { Box, Button, Typography } from "@platform/service-ui-libraries";
import React, { useContext, useEffect } from "react";
import { Context } from "./Context";
import "./ShoppingCart.scss";


const ShoppingCart = () => {
  const {
    cart,
    IncreaseQuantity,
    DecreaseQuantity,
    DeleteProduct,
    BuyNow
  } = useContext(Context);
  const total = cart.reduce((acc, el) => acc + el.quantity * el.off_price, 0);
  if (cart.length == 0) {
    return <Box className="no">No products in the cart</Box>;
  }

  return (
    <Box className="cart">
      <Box className="no">Cart</Box>
      {cart.map((el) => {
        return (
          <Box key={el.id} className="cartCard">
            <Box className="img">
              <img src={el.images.image1} alt="cart" />
              <Button
                onClick={() => DeleteProduct(el.id)}
                className="delete"
                variant="contained"
                color="red"
              >
                Delete
              </Button>
            </Box>
            <Box>
              <Typography className="heading">{el.title}</Typography>
              <Box className="fix">
              <p className="heading">{el.brand}</p>
              <Box>
                <Button
                  disabled={el.quantity == 1}
                  onClick={() => {
                    DecreaseQuantity(el.id);
                  }}
                  variant="outlined"
                >
                  -
                </Button>{" "}
                {el.quantity}{" "}
                <Button
                  disabled={el.stock == 0}
                  onClick={() => {
                    IncreaseQuantity(el.id);
                  }}
                  variant="outlined"
                >
                  +
                </Button>
              </Box>
              </Box>
              <Box className="box">
                <Box>
                  <table style={{ textAlign: "center" ,marginLeft:"15px"}}>
                    <thead>
                      <tr>
                        <th>Price</th>
                        <th>x</th>
                        <th>Quantity</th>
                        <th>=</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{el.off_price}</td>
                        <th>x</th>
                        <td>{el.quantity}</td>
                        <th>=</th>
                        <td>₹ {el.quantity * el.off_price}</td>
                      </tr>
                    </tbody>
                  </table>
                </Box>
              </Box>

              
             
            </Box>
          </Box>
        );
      })}
      <Typography className="bill">Total Amount :- ₹ {total}</Typography>
      <Button onClick={BuyNow} className="button" variant="contained">Buy now</Button>
    </Box>
  );
};

export default ShoppingCart;
