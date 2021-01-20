import React from "react";
import { Link } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";

import { firebase } from "../../../firebase";

const AdminNav = () => {
  const links = [
    {
      title: "Dashboard",
      linkTo: "/dashboard"
    },
    {
      title: "Properties",
      linkTo: "/admin_properties"
    },
    {
      title: "Add Property",
      linkTo: "/admin_properties/edit_property"
    },

    {
      title: "Emails",
      linkTo: "/admin_rentals/add_rental"
    }
  ];

  const renderItems = () =>
    links.map(link => (
      <Link to={link.linkTo} key={link.title}>
        <ListItem className="admin__nav">{link.title}</ListItem>
      </Link>
    ));

  const logoutHandler = () => {
    firebase
      .auth()
      .signOut()
      .then(
        () => {
          console.log("Log out succesfull");
        },
        error => {
          console.log("Error logging out");
        }
      );
  };

  return (
    <>
      {renderItems()}
      <ListItem className="admin__nav" onClick={() => logoutHandler()}>
        Log out
      </ListItem>
    </>
  );
};

export default AdminNav;
