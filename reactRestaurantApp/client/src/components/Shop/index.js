import React, { Component } from "react";
import PageTop from "../utils/page_top";

import { connect } from "react-redux";
import { getMenuItemsToShop, getCategories } from "../../actions/menu_actions";

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faBars from "@fortawesome/fontawesome-free-solid/faBars";
import faTh from "@fortawesome/fontawesome-free-solid/faTh";
import CardBlockShop from "../utils/card_block_shop";

class TakeOut extends Component {
  state = {
    grid: "",
  };

  componentDidMount() {
    this.props.dispatch(getCategories());
    this.props.dispatch(getMenuItemsToShop());
  }

  handleGrid = () => {
    this.setState({
      grid: !this.state.grid ? "grid_bars" : "",
    });
  };

  render() {
    return (
      <div>
        <PageTop title="Browse Menu" />
        <div className="container">
          <div className="shop_wrapper">
            <div className="left">
              <div className="shop_options">
                <div className="shop_grids clear">
                  <div
                    className={`grid_btn ${this.state.grid ? "" : "active"}`}
                    onClick={() => this.handleGrid()}
                  >
                    <FontAwesomeIcon icon={faTh} />
                  </div>
                  <div
                    className={`grid_btn ${!this.state.grid ? "" : "active"}`}
                    onClick={() => this.handleGrid()}
                  >
                    <FontAwesomeIcon icon={faBars} />
                  </div>
                </div>
              </div>
              <div style={{ clear: "both" }}>
                <CardBlockShop
                  list={this.props.menuItems.toShop}
                  title="Most Popular Dishes"
                  grid={this.state.grid}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    menuItems: state.menuItems,
  };
};

export default connect(mapStateToProps)(TakeOut);
