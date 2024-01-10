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
  AccordionDetails,
} from "@platform/service-ui-libraries";
import {
  AppBar,
  Button,
  Grid,
  IconButton,
  Toolbar,
} from "@platform/service-ui-libraries";
import { ShoppingCart as Cart, ChevronDown } from "react-feather";
import { index } from "d3";
import { Context } from "../../Components/Context";
import ShoppingCart from "../../Components/ShoppingCart";
import AddProduct from "../../Components/AddProduct";

function LoginPage() {
  const [expanded, setExpanded] = useState(0);
  const { swap, addToCart, products, setProducts, ManageStock ,sidebarWidth} =
    useContext(Context);
  useEffect(() => {
    async function fetchData() {
      let res = await fetch("http://localhost:8080/products");
      let data = await res.json();
      console.log(
        JSON.stringify(
          [
            ...new Set(
              data.map((el, i) => {
                return el.brand;
              })
            ),
          ].map((el, i) => {
            return {
              id: i + 1,
              name: el,
            };
          })
        )
      );
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
  }, [swap]);
  console.log(products);
  return (
    <Box style={{width:sidebarWidth ?"93%":"80%",margin:"auto"}}>
      <Box className="lead">
        <Box className="products">
          {products.map((el, i) => {
            return (
              <Accordion key={i} expanded={expanded == i}>
                <AccordionSummary
                  className="heading"
                  onClick={() => {
                    if (expanded == i) {
                      setExpanded(null);
                      return;
                    }
                    setExpanded(i);
                  }}
                  expandIcon={<ChevronDown />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography
                    style={{ textAlign: "center" }}
                    className="heading"
                    variant="h1"
                  >
                    {el[0]}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid className="grid-container">
                    {el[1].map((product, index) => {
                      return (
                        <Grid className="card" item key={index}>
                          <img
                            src={product.images.image1}
                            alt="Product"
                            style={{ width: "100%", height: "400px" }}
                          />
                          <Box className="content">
                            <Typography variant="h3">
                              {product.title}
                            </Typography>
                            <Typography variant="h3">
                              ₹ {product.off_price}
                            </Typography>
                          </Box>
                          <Button
                            disabled={product.stock == 0}
                            onClick={() => {
                              addToCart(product);
                            }}
                            className="btn"
                            variant="contained"
                          >
                            {product.stock !== 0 ? (
                              <span>
                                <Cart />+
                              </span>
                            ) : (
                              <p className="out">Out of Stock</p>
                            )}
                          </Button>
                        </Grid>
                      );
                    })}
                  </Grid>
                </AccordionDetails>
              </Accordion>
            );
          })}
          {/* {products.map((el, i) => {
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
                          ₹ {product.off_price}
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
        })} */}
        </Box>
        <Box className="carts">
          <ShoppingCart />
        </Box>
      </Box>
      {/* <AddProduct/> */}
    </Box>
  );
}
export default LoginPage;
