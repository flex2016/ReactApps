import React from "react";
import { useSelector } from "react-redux";
import { useFirebase } from "react-redux-firebase";
import { Menu, Container, Button } from "semantic-ui-react";
import { NavLink, Link, withRouter } from "react-router-dom";
import SignedOutMenu from "../Menus/SignedOutMenu";
import SignedInMenu from "../Menus/SignedInMenu";

const NavBar = ({ history }) => {
  const firebase = useFirebase();
  const auth = useSelector(state => state.firebase.auth, []);

  const handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        history.push("/");
      });
  };

  const authenticated = auth.isLoaded && !auth.isEmpty;
  return (
    <Menu fixed="top">
      <Container>
        <Menu.Item as={NavLink} exact to="/" header>
          <img src="/logo192.png" alt="logo" />
          Job-Tracker
        </Menu.Item>
        {authenticated && (
          <Menu.Item as={NavLink} exact to="/jobs" name="Jobs" />
        )}
        {authenticated && (
          <Menu.Item>
            <Button
              as={Link}
              to="/createJob"
              floated="right"
              primary
              content="Create Job"
            />
          </Menu.Item>
        )}
        {authenticated ? (
          <SignedInMenu signOut={handleSignOut} />
        ) : (
          <SignedOutMenu />
        )}
      </Container>
    </Menu>
  );
};

export default withRouter(NavBar);
