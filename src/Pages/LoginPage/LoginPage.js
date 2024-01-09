import React, { useContext, useState,useRef } from "react";
import { useHistory } from "react-router-dom";
import "./LoginPage.scss";

import {
  Box,
  Typography,
  Card,
  TextForm,
  Container,
  AlbaButton,
} from "@platform/service-ui-libraries";

function LoginPage() {
  
  return (
    <Box className="loginCard">
      <Card
        sx={{ minWidth: 275 }}
        className="tile"
        style={{ backgroundColor: "white" }}
      >
        <Container maxWidth="xs">
          <Box>
            <Typography>THREE MUSKETEERS</Typography>
            <form>
Login
            </form>
          </Box>
        </Container>
      </Card>
    </Box>
  );
}
export default LoginPage;
