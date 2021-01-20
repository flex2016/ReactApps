import React, { Component } from "react";
import Fade from "react-reveal/Fade";
import Slide from "react-reveal/Slide";

import OKportrait from "../../../Resources/images/OrysyaKurilo.jpg";

class Realtor extends Component {
  state = {
    soldStart: 0,
    soldEnd: 50,
    rentStart: 0,
    rentEnd: 575
  };

  sold = () => {
    if (this.state.rentStart < this.state.rentEnd) {
      this.setState({
        rentStart: this.state.rentStart + 1
      });
      if (this.state.soldStart < this.state.soldEnd) {
        this.setState({
          soldStart: this.state.soldStart + 1
        });
      }
    }
  };

  componentDidUpdate() {
    setTimeout(() => {
      this.sold();
    }, 30);
  }

  render() {
    return (
      <div className="realtor">
        <Fade onReveal={() => this.sold()}>
          <h3 className="heading-2 realtor__name">Orysya Kurilo</h3>

          <div className="realtor__info">
            <img src={OKportrait} alt="Realtor 1" className="realtor__img" />

            <div>
              <p className="realtor__sold">
                <span className="realtor__num">{this.state.soldStart}</span>
                houses sold
              </p>
              <p className="realtor__sold">
                <span className="realtor__num">{this.state.rentStart}</span>
                houses rented
              </p>
            </div>
          </div>
        </Fade>
        <Slide right>
          <h4 className="realtor__about heading-4">
            I am a creative and detail oriented professional focused on building
            lifelong relationships with my clients. I recognize that each client
            has different needs so it is imperative that I provide for those
            needs in a smooth manner from start to finish.
          </h4>
        </Slide>
      </div>
    );
  }
}

export default Realtor;
