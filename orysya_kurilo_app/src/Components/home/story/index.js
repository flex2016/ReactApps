import React from "react";
import { Link } from "react-router-dom";
import { MyButton } from "../../ui/misc";

import hero from "../../../Resources/images/hero.jpg";
export default function index() {
  return (
    <>
      <div className="story__pictures">
        {/* <img src={hero} alt="Couple with new house" className="story__img--1" /> */}
        <img src={hero} alt="New house" className="story__img--2" />
      </div>

      <div className="story__content">
        <h3 className="heading-3 mb-sm">Happy Customers</h3>
        <h2 className="heading-2 heading-2--dark mb-md">
          &ldquo;The best decision of our lives&rdquo;
        </h2>
        <p className="story__text">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur
          distinctio necessitatibus pariatur voluptatibus. Quidem consequatur
          harum volupta!
        </p>
        <Link to="/the_properties">
          <MyButton
            text="Find your own home"
            bck="#101d2c"
            color="#c69963"
            font="1.8rem"
            padding="1rem 5rem"
            var="text"
          ></MyButton>
        </Link>
        {/* <a href="#contact">
          <button className="btn">Find your own home</button>
        </a> */}
      </div>
    </>
  );
}
