import React, { Component } from "react";

import Zoom from "react-reveal/Zoom";
import { SvgIcons } from "../../ui/icons";

class Features extends Component {
  state = {
    svg: [
      "icon-global",
      "icon-trophy",
      "icon-map-pin",
      "icon-key",
      "icon-presentation",
      "icon-building-o"
    ],
    heading: [
      "World's best luxury homes",
      "Only the best properties",
      "All homes in in top locations",
      "New home in one week",
      "Top 1% realtors",
      "Rental Properties"
    ],
    text: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt uts",
      "Dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea",
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      "Handpick rental properly to give you the best living."
    ],

    delay: [500, 0, 500, 200, 300, 100]
  };

  showBoxes = () =>
    this.state.svg.map((box, i) => (
      <Zoom delay={this.state.delay[i]} key={i}>
        <div className="feature">
          <SvgIcons className="feature__icon" name={this.state.svg[i]} />
          <h4 className="heading-4 heading-4--dark">{this.state.heading[i]}</h4>
          <p className="feature__text">{this.state.text[i]}</p>
        </div>
      </Zoom>
    ));

  render() {
    return <div className="features">{this.showBoxes()}</div>;
  }
}

export default Features;
