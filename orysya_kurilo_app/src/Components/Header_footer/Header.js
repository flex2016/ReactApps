import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import { MyButton, Tag } from "../ui/misc";

import { Link } from "react-router-dom";
import { Logo } from "../ui/icons";

class Header extends Component {
  render() {
    return (
      <AppBar
        className="header"
        position="fixed"
        style={{
          backgroundColor: "#c69963",
          boxShadow: "none"
        }}
      >
        <Toolbar className="header__nav">
          <div style={{ flexGrow: 1 }}>
            <div>
              <Logo link={true} linkTo="/" className="header__logo" />
            </div>
          </div>
          {/* <Link className="header__link" to="/">
            <MyButton
              text="Sell"
              bck="default"
              size="large"
              color="inherit"
              font="1.8rem"
              padding=".5rem 5rem"
              var="text"
            />
          </Link> */}
          <Link className="header__link" to="/the_properties">
            <MyButton
              text="Buy"
              bck="default"
              color="inherit"
              font="1.9rem"
              //padding=".5rem 4rem"
              var="text"
            />
          </Link>
          {/* <Link className="header__link" to="/rent">
            <MyButton
              text="Rent"
              bck="default"
              color="inherit"
              font="1.8rem"
              padding=".5rem 5rem"
              var="text"
            ></MyButton>
          </Link> */}
          <Tag
            className="header__number"
            text="888-888-8888"
            bck="inherit"
            color="#ffffff"
            size="1.8rem"
            var="outlined"
          ></Tag>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Header;
