import React, { useMemo, useState, useEffect } from "react";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import LoginPage from "./Pages/LoginPage/LoginPage";
import Navbar from "./Components/Navbar";
import { ContextProvider } from "./Components/Context";
import AddProduct from "./Components/AddProduct";
import Brands from "./Components/Brands";

export default function Root() {
  return (
    <ContextProvider>

    <BrowserRouter>
        <Navbar/>
        <CssBaseline />
        <React.Suspense>
                  
          <Switch>
            <Route exact path="/" render={()=><LoginPage/>}/>
            <Route exact path="/add" render={()=><AddProduct/>}/>
            <Route exact path="/brand" render={()=><Brands/>}/>

        
            {/* <Route exact path="/auth/login" render={() => <LoginPage />} /> */}
            {/* <Route exact path="/home" render={() => <HomePage />} />
            <Route
              exact
              path="/csv"
              render={() => (
                <PrivateCsvEditRoute>
                  <CsvPage />
                </PrivateCsvEditRoute>
              )}
            />
            <Route
              exact
              path="/users/authorization/:id"
              render={() => <PermissionPage />}
            />

            <Route exact path="/users" render={() => <UsersPage />} />
            <Route
              exact
              path="/gameredirect"
              render={() => (
                <PrivateGameRoute>
                  <GamePageRedirect />
                </PrivateGameRoute>
              )}
            />
            <Route
              exact
              path="/gameredirect/game"
              render={() => <TicTacPage />}
            />
            {/* <Route exact path="/missing" render={()=> <MissingPage/>} /> 

            <Route exact path="/unauth" render={() => <UnauthorizedPage />} />
            <Route exact path="/Compo" render={() => <ShoaibCompoPractice />} /> */}
          </Switch>
        </React.Suspense>
    </BrowserRouter>
    </ContextProvider>

  );
}
