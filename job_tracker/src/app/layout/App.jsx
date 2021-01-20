import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Container } from "semantic-ui-react";
import { Route, Switch } from "react-router-dom";

import NavBar from "../../features/nav/NavBar/NavBar";
import JobDashboard from "../../features/job/JobDashboard/JobDashboard";
import JobDetailedPage from "../../features/job/JobDetailed/JobDetailedPage";
import HomePage from "../../features/home/HomePage";
import SettingsDashboard from "../../features/user/Settings/SettingsDashboard";
import JobForm from "../../features/job/JobForm/JobForm";
import ModalManager from "../../features/modals/ModalManager";
import UserDetailedPage from "../../features/user/UserDetailed/UserDetailedPage";
import { UserIsAuthenticated } from "../../features/auth/AuthWrapper";
import LoadingComponent from "./LoadingComponent";
import NotFound from "../../app/layout/NotFound";

const App = () => {
  const auth = useSelector((state) => state.firebase && state.firebase.auth);
  if (!auth.isLoaded && auth.isEmpty) return <LoadingComponent />;
  return (
    <Fragment>
      <ModalManager />
      <NavBar />
      <Container className="main">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route
            exact
            path="/jobs"
            component={UserIsAuthenticated(JobDashboard)}
          />
          <Route
            path="/jobs/:id"
            component={UserIsAuthenticated(JobDetailedPage)}
          />
          <Route
            path="/profile/:id"
            component={UserIsAuthenticated(UserDetailedPage)}
          />
          <Route
            path="/settings"
            component={UserIsAuthenticated(SettingsDashboard)}
          />
          <Route
            path={["/createJob/", "/manage/:id"]}
            component={UserIsAuthenticated(JobForm)}
          />
          <Route path="/error" component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </Container>
    </Fragment>
  );
};

export default App;
