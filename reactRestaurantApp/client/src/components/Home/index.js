import React, { Component } from "react";
import HomeSlider from "./home_slider";
import HomePromotion from "./home_promotion";
import CardBlock from "../utils/card_block";

import { connect } from "react-redux";
import {
  getMenuItemsBySell,
  getMenuItemsByArrival,
} from "../../actions/menu_actions";

class Home extends Component {
  componentDidMount() {
    this.props.dispatch(getMenuItemsBySell()).then(() => {});
    this.props.dispatch(getMenuItemsByArrival());
  }

  render() {
    return (
      <div>
        <HomeSlider />
        <CardBlock
          list={this.props.menuItems.bySell}
          title="Most Popular Dishes"
        />
        <HomePromotion />
        <CardBlock list={this.props.menuItems.byArrival} title="New Dishes" />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    menuItems: state.menuItems,
  };
};
export default connect(mapStateToProps)(Home);
