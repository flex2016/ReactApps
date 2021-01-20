import React from "react";
import Layout from "./Hoc/Layout";
import { Switch, Route } from "react-router-dom";

import PrivateRoute from "./Components/authRoutes/privateRoutes";
import PublicRoute from "./Components/authRoutes/publicRoutes";

import Home from "./Components/home";
import SignIn from "./Components/signin";
import TheProperties from "./Components/theProperties";
import Property from "./Components/property";
import NotFound from "./Components/ui/not_found";

import Dashboard from "./Components/admin/Dashboard";
import AdminProperties from "./Components/admin/properties";
import addEditProperty from "./Components/admin/properties/addEditProperty";
const Routes = (props) => {
  return (
    <Layout>
      <Switch>
        <PrivateRoute
          {...props}
          path="/admin_properties/edit_property/"
          exact
          component={addEditProperty}
        />
        <PrivateRoute
          {...props}
          path="/admin_properties/edit_property/:id"
          exact
          component={addEditProperty}
        />
        <PrivateRoute
          {...props}
          path="/admin_properties"
          exact
          component={AdminProperties}
        />
        <PrivateRoute
          {...props}
          path="/dashboard"
          exact
          component={Dashboard}
        />
        <PublicRoute
          {...props}
          restricted={true}
          path="/sign_in"
          exact
          component={SignIn}
        />
        <PublicRoute
          {...props}
          restricted={false}
          path="/the_properties"
          exact
          component={TheProperties}
        />
        <PublicRoute
          {...props}
          restricted={false}
          path="/the_properties/:id"
          exact
          component={Property}
        />
        <PublicRoute
          {...props}
          restricted={false}
          path="/"
          exact
          component={Home}
        />
        <PublicRoute {...props} restricted={false} component={NotFound} />
      </Switch>
    </Layout>
  );
};
export default Routes;
