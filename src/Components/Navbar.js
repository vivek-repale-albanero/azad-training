import React, { useContext, useState } from 'react'
import {AppBar,Toolbar,Box,Typography,Button,IconButton, Icon} from "@platform/service-ui-libraries";
import { Home, ShoppingCart } from 'react-feather';
import { Context } from './Context';
import { Badge } from '@material-ui/core';


const Navbar = () => {
  const {cart,setSwap}=useContext(Context)
  return (
    <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar className="navbar">
            <Button onClick={()=>setSwap(true)}  >
              <Home/>{" "} Home
            </Button>
            <Button onClick={()=>setSwap(false)}   color="inherit">
              <ShoppingCart />{" "} Cart{ cart.length>0 && (<Badge>({cart.length})</Badge>)}
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
  )
}

export default Navbar