import React, { useContext, useState } from "react";
import "./Navbar.scss"
import {
  AppBar,
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@platform/service-ui-libraries";
import { Archive, FilePlus, Home, Menu, ShoppingCart } from "react-feather";
import { Context } from "./Context";
import { Link } from "react-router-dom";

const Navbar = () => {

  const {sidebarWidth, setSidebarWidth}=useContext(Context)
  const toggleSidebar = () => {
    setSidebarWidth(!sidebarWidth);
  };

  return (
    <>
      <AppBar className="sidebar" style={{ width: sidebarWidth ? '3%' : '10%', left: 0 }}>
        <Toolbar>
          <Button style={{marginLeft:"-1rem"}} onClick={toggleSidebar}><Menu/></Button>
        </Toolbar>
        <Box className="navbar">
          <Link to="/" className="sidebar-link">
            <Button>
              <Home />{!sidebarWidth ? <span>Home</span>:""}
            </Button>
          </Link>
          <Link to="/add" className="sidebar-link">
            <Button color="inherit">
              <FilePlus /> {!sidebarWidth ? <span>Add Products</span>:""}
            </Button>
          </Link>
          <Link to="/brand" className="sidebar-link">
            <Button color="inherit">
              <Archive /> {!sidebarWidth ? <span>Brands</span>:""}
            </Button>
          </Link>
        </Box>
      </AppBar>
      <div className="content" style={{ marginLeft: sidebarWidth ? '5%' : '10%', paddingLeft: '20px' }}>
        {/* Your main content goes here */}
      </div>
    </>
  );
};

export default Navbar;
