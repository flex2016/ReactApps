import React from "react";
import ReactDOM from "react-dom";
import "./Resources/scss/main.scss";

import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import { firebase } from "./firebase";
import ScrollToTop from "./Hoc/ScrollToTop";

const App = (props) => {
  return (
    <BrowserRouter>
      <ScrollToTop>
        <Routes {...props} />
      </ScrollToTop>
    </BrowserRouter>
  );
};

firebase.auth().onAuthStateChanged((user) => {
  console.log(user);
  ReactDOM.render(<App user={user} />, document.getElementById("root"));
});
