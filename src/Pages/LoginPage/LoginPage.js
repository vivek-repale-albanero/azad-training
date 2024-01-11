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
  Badge,
  CircularProgress
} from "@platform/service-ui-libraries";
import { ShoppingCart as Cart, ChevronDown } from "react-feather";
import { index } from "d3";
import { Context } from "../../Components/Context";
import ShoppingCart from "../../Components/ShoppingCart";
import AddProduct from "../../Components/AddProduct";
import Header from "../../Components/Header";


function LoginPage() {
  const [expanded, setExpanded] = useState(0);
  const {
    swap,
    addToCart,
    cart,
    products,
    setProducts,
    ManageStock,
    sidebarWidth,
  } = useContext(Context);
  const [showCart, setShowCart] = useState(false);
  useEffect(() => {
    async function fetchData() {
      let res = await fetch("http://localhost:8080/products");
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
  }, [swap]);
  const [loading, setLoading] = useState({});
  
  const CartLoading = (productId) => {
    setLoading(prevLoading => ({ ...prevLoading, [productId]: true }));

   
    setTimeout(() => {
      setLoading(prevLoading => ({ ...prevLoading, [productId]: false }));
     
      console.log(`Product ${productId} added to cart`);
    }, 2000); 
  };
  return (
    <Box style={{ marginLeft: sidebarWidth ? "3%" : "10%" }}>
      <Header>
        <Box style={{ marginTop: "1rem" }} className="header">
          <Typography style={{ fontSize: "2.2rem", fontWeight: "bold" }}>
            Products
          </Typography>
          <Button onClick={() => setShowCart(!showCart)} variant="contained">
            <Cart />
            <Badge
              style={{
                fontSize: "1rem",
                fontWeight: "bold",
                marginBottom: "20px",
              }}
            >
              {cart.length}
            </Badge>
          </Button>
        </Box>
        <Box className="lead">
          <Box style={{ width: "100%" }} className="products">
            {products.map((el, i) => {
              return (
                <Accordion key={i} expanded={expanded == i}>
                  <AccordionSummary
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
                      style={{ fontSize: "1rem", fontWeight: "bold" }}
                      className="heading"
                      variant="h1"
                    >
                      {el[0]}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid
                      className="grid-container"
                      style={{
                        gridTemplateColumns: showCart
                          ? "repeat(4, 1fr)"
                          : "repeat(5, 1fr)",
                      }}
                    >
                      {el[1].map((product, index) => {                        
                        
                       
                        return (
                          <Grid className="card" item key={index}>
                            <img
                              src={product.images.image1}
                              alt="Product"
                              style={{
                                width: "100%",
                                height: "300px",
                                objectFit: "cover",
                                borderTopLeftRadius: "10px",
                                borderTopRightRadius: "10px",
                              }}
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
                              disabled={product.stock == 0 || loading[product.id]}
                              onClick={() => {      
                                CartLoading(product.id)                         
                                addToCart(product);
                              }}
                              className="btn"
                              variant="contained"
                            >
                              {product.stock !== 0 ? (
                                <span>
                                {loading[product.id] ? <CircularProgress />:  <Cart />}
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
          </Box>
          {showCart && (
            <Box Box className="carts">
              <ShoppingCart />
            </Box>
          )}
        </Box>
      </Header>
    </Box>
  );
}
export default LoginPage;
