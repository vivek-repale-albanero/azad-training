import React, { useContext, useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./LoginPage.scss";

import {
  Box,
  Typography,
  Card,
  TextForm,
  Container,
  AlbaButton,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from "@platform/service-ui-libraries";
import { AppBar, Button, Grid, IconButton, Toolbar } from "@material-ui/core";
import { ShoppingCart as Cart, ChevronDown } from "react-feather";
import { index } from "d3";
import { Context } from "../../Components/Context";
import ShoppingCart from "../../Components/ShoppingCart";

function LoginPage() {
  const [products, setProducts] = useState([]);
  const { swap } = useContext(Context);

  const { addToCart } = useContext(Context);
  useEffect(() => {
    async function fetchData() {
      let res = await fetch("https://determined-gold-jaguar.cyclic.app/men");
      let data = await res.json();
      let obj = {};
      for (let i = 0; i < data.length; i++) {
        if (obj[data[i].brand]) {
          obj[data[i].brand].push(data[i]);
        } else {
          obj[data[i].brand] = [data[i]];
        }
      }
      setProducts(Object.entries(obj));
    }
    fetchData();
  }, []);

  return (
    <Box>
      {swap ? (
        <Box>
          {/* <Accordion>
            {products.map((el, i) => {
              return (
                <>
                  <AccordionSummary
                    key={i}
                    expandIcon={<ChevronDown />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className="heading" variant="h1">
                      {el[0]}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                  <Grid className="grid-container">
                  {el[1].map((product, index) => {
                    return (
                      <Grid className="card" item key={index}>
                        <img
                          src={product.images.image2}
                          alt="Product"
                          style={{ width: "100%", height: "400px" }}
                        />
                        <Box className="content">
                          <Typography variant="h3">{product.title}</Typography>
                          <Typography variant="h3">
                            ${product.off_price}
                          </Typography>
                        </Box>
                        <Button
                          onClick={() => addToCart(product)}
                          className="btn"
                          variant="contained"
                        >
                          <Cart /> <span>Add to cart</span>
                        </Button>
                      </Grid>
                    );
                  })}
                </Grid>
                  </AccordionDetails>
                </>
              );
            })}
          </Accordion> */}
          {products.map((el, i) => {
            return (
              <Box className="main" key={i}>
                <Typography className="heading" variant="h1">
                  {el[0]}
                </Typography>
                <Grid className="grid-container">
                  {el[1].map((product, index) => {
                    return (
                      <Grid className="card" item key={index}>
                        <img
                          src={product.images.image2}
                          alt="Product"
                          style={{ width: "100%", height: "400px" }}
                        />
                        <Box className="content">
                          <Typography variant="h3">{product.title}</Typography>
                          <Typography variant="h3">
                            ${product.off_price}
                          </Typography>
                        </Box>
                        <Button
                          onClick={() => addToCart(product)}
                          className="btn"
                          variant="contained"
                        >
                          <Cart /> <span>Add to cart</span>
                        </Button>
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>
            );
          })}
        </Box>
      ) : (
        <ShoppingCart />
      )}
    </Box>
  );
}
export default LoginPage;
