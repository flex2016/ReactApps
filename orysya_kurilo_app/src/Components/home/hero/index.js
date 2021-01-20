import React from "react";
import Logo from "../../../Resources/images/logos/logo.svg";

import { scrollToElement } from "../../ui/misc";
const Hero = () => {
  return (
    <div className="hero">
      {/* <img src={Logo} alt="OK logo" className="header__logo" /> */}
      <></>
      <h3 className="heading-3-big mb-hg" style={{ marginTop: "10rem" }}>
        Your own home:
      </h3>
      <h1 className="heading-1-big">The ultimate personal freedom</h1>

      <button
        onClick={() => scrollToElement("contact")}
        className="btn hero__btn"
      >
        Contact Now!
      </button>
    </div>
  );
};

export default Hero;
