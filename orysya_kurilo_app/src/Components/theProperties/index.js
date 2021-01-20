import React, { Component } from "react";
import { Link } from "react-router-dom";
import { firebaseProperties, firebase } from "../../firebase";
import Fade from "react-reveal/Fade";
import { ImgSrc, SvgIcons } from "../ui/icons";
import { firebaseLooper, reverseArray, formatMoney } from "../ui/misc";
import CircularProgress from "@material-ui/core/CircularProgress";
import PropertyBlock from "../ui/property_block";

export default class index extends Component {
  state = {
    loading: true,
    properties: [],
    filterProperties: [],
  };
  componentDidMount() {
    firebaseProperties.once("value").then((snapshot) => {
      const properties = firebaseLooper(snapshot);
      this.setState({
        loading: false,
        properties: properties,
        filterProperties: properties,
      });
    });
  }

  filter = (price, content = "") => {
    if (content === "high") {
      const list = this.state.filterProperties.sort(
        (a, b) => b[price] - a[price]
      );
      console.log(list);
      this.setState({
        filterProperties: list,
        propertyFilter: "High",
      });
    } else {
      const list2 = this.state.filterProperties.sort(
        (a, b) => a[price] - b[price]
      );
      console.log(list2);
      this.setState({
        filterProperties: list2,
        propertyFilter: "Low",
      });
    }
  };

  // filterLow = price => {
  //   this.setState({
  //     filterProperties: this.state.properties.sort(
  //       (a, b) => a[price] - b[price]
  //     ),
  //     propertyFilter: "Low"
  //   });
  // };
  // filterHigh = price => {
  //   this.setState({
  //     properties: this.state.properties.sort((a, b) => b[price] - a[price]),
  //     propertyFilter: "High"
  //   });
  // };

  showProperties = (properties) =>
    properties
      ? properties.map((property) => (
          <Fade key={property.id}>
            <Link to={`/the_properties/${property.id}`}>
              <PropertyBlock property={property} />
            </Link>
          </Fade>
        ))
      : null;

  // showPropertiesTest = () =>
  //   this.state.properties ? (
  //     <NodeGroup
  //       data={this.state.properties}
  //       keyAccessor={d => d.id}
  //       start={() => ({
  //         opacity: 0,
  //         x: -200
  //       })}
  //       enter={(d, i) => ({
  //         opacity: [1],
  //         x: [0],
  //         timing: {
  //           duration: 500,
  //           delay: i * 50,
  //           ease: easePolyOut
  //         }
  //       })}
  //       update={(d, i) => ({
  //         opacity: [1],
  //         x: [0],
  //         timing: {
  //           duration: 500,
  //           delay: i * 50,
  //           ease: easePolyOut
  //         }
  //       })}
  //       leave={(d, i) => ({
  //         opacity: [0],
  //         x: [-200],
  //         timing: {
  //           duration: 500,
  //           delay: i * 50,
  //           ease: easePolyOut
  //         }
  //       })}
  //     >
  //       {nodes => (
  //         <>
  //           {nodes.map(({ key, data, state: { x, opacity } }) => (
  //             <div
  //               key={key}
  //               className="match_box_big"
  //               style={{
  //                 opacity,
  //                 transform: `translate(${x}px)`
  //               }}
  //             >
  //               {`${console.log(data)}`}
  //               <div className="property">
  //                 <ImgSrc
  //                   src={data.url}
  //                   alt={data.name}
  //                   className="property__img"
  //                 ></ImgSrc>
  //                 <SvgIcons
  //                   className="property__like"
  //                   name="icon-heart-full"
  //                 ></SvgIcons>

  //                 <h5 className="property__name">{data.name}</h5>
  //                 <div className="property__location">
  //                   <SvgIcons name="icon-map-pin"></SvgIcons>
  //                   <p>{data.city}</p>
  //                 </div>
  //                 <div className="property__rooms">
  //                   <SvgIcons name="icon-profile-male"></SvgIcons>
  //                   <p>{data.rooms} rooms</p>
  //                 </div>
  //                 <div className="property__area">
  //                   <SvgIcons name="icon-expand"></SvgIcons>
  //                   <p>
  //                     {data.area} m<sup>2</sup>
  //                   </p>
  //                 </div>
  //                 <div className="property__price">
  //                   <SvgIcons name="icon-key"></SvgIcons>
  //                   <p>${formatMoney(data.price)}</p>
  //                 </div>
  //                 {/* <button className="btn property__btn">View Property</button> */}
  //               </div>
  //               {/* <Link to={`/the_properties/${data.id}`}>
  //                                  <PropertyBlock property={data} />
  //                                </Link> */}
  //             </div>
  //           ))}
  //         </>
  //       )}
  //     </NodeGroup>
  //   ) : null;
  render() {
    console.log(this.state);
    const state = this.state;
    return (
      <div className="container-two">
        <div className="property__filters">
          <div className="property__filters__box">
            <div className="cont">
              <div className="tag">Sort:</div>
              <div
                className={`option ${
                  state.propertyFilter === "Low" ? "active" : ""
                }`}
                onClick={() => this.filter("price", "low")}
              >
                Price Low
              </div>
              <div
                className={`option ${
                  state.propertyFilter === "High" ? "active" : ""
                }`}
                onClick={() => this.filter("price", "high")}
              >
                Price High
              </div>
            </div>
          </div>
          {/* <div className="property_filters_box">
            <div className="tag">Result game</div>
            <div className="cont">
              <div
                className={`option ${
                  state.filterProperties === "All" ? "active" : ""
                }`}
                onClick={() => this.showResult("All")}
              >
                All
              </div>
              <div
                className={`option ${
                  state.filterProperties === "W" ? "active" : ""
                }`}
                onClick={() => this.showResult("W")}
              >
                W
              </div>
              <div
                className={`option ${
                  state.filterProperties === "L" ? "active" : ""
                }`}
                onClick={() => this.showResult("L")}
              >
                L
              </div>
              <div
                className={`option ${
                  state.resultFilter === "D" ? "active" : ""
                }`}
                onClick={() => this.showResult("D")}
              >
                D
              </div>
            </div>
          </div> */}
        </div>
        <div className="properties" style={{ margin: "-5rem 0 10rem 0" }}>
          {!this.state.loading ? (
            <>{this.showProperties(this.state.properties)}</>
          ) : (
            <div style={{ margin: "auto" }}>
              <CircularProgress
                size={60}
                thickness={7}
                style={{ color: "#c69963" }}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}
