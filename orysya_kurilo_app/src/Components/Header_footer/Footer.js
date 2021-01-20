import React from "react";
import { Logo } from "../ui/icons";

import { Tag } from "../ui/misc";

const Footer = () => {
  return (
    <footer className="footer">
      <div>
        <Logo className="footer__logo" link={true} linkTo="/" />
      </div>
      <div className="nav">
        <Tag
          className="nav__link"
          link={true}
          linkto="/the_properties"
          text="Find your dream home"
        ></Tag>
        {/* <Tag
          className="nav__link"
          link={true}
          linkto="/contact"
          text="Request proposal"
        ></Tag> */}
        <Tag
          className="nav__link"
          link={true}
          linkto="/"
          text="Contact us"
        ></Tag>
        <Tag
          className="nav__link"
          link={true}
          linkto="/"
          text="Submit Your Property"
        ></Tag>
      </div>
      <p className="footer__copyright">
        <a href="http://taraskurilo.com/" target="blank">
          &copy; Copyright 2019 by Taras Kurilo
        </a>
      </p>
    </footer>
  );
};

export default Footer;
