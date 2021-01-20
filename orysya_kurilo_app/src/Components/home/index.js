import React from "react";
import Hero from "./hero";
import Realtor from "./realtor";
import Features from "./features";
import Story from "./story";
import Properties from "./properties";
import Contact from "./contact";

const Home = () => {
  return (
    <div className="container">
      <Hero />
      <Realtor />
      <Features />
      <Story />
      <Properties />
      <Contact />
    </div>
  );
};

export default Home;
