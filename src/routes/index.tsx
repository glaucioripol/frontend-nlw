import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { Home, CreatePoint } from "../pages";

export const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/create-point" exact component={CreatePoint} />
    </Switch>
  </BrowserRouter>
);
