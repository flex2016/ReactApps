import React, { Component } from "react";
import { firebaseDB } from "../../firebase";
import PropertyBlock from "../ui/property_block";
import { ImgSrc, SvgIcons } from "../ui/icons";
import { formatMoney } from "../ui/misc";

export default class index extends Component {
  state = {
    loading: true,
    property: []
  };
  componentDidMount() {
    const propertyId = this.props.match.params.id;
    if (!propertyId) {
      return null;
    } else {
      firebaseDB
        .ref(`properties/${propertyId}`)
        .once("value")
        .then(snapshot => {
          const propertyData = snapshot.val();
          // console.log(property);
          this.setState({
            property: propertyData
          });
        });
    }
  }

  render() {
    const property = this.state.property;

    console.log(this.state.property);
    return (
      <div className="container-two">
        <div className="property__image-container">
          <ImgSrc
            className="property__image"
            src={property.url}
            alt={property.name}
          ></ImgSrc>
        </div>
        <div className="property__location-container">
          <div>
            <p>{property.address}</p>
            <p>{property.city}</p>
          </div>

          <p>${formatMoney(property.price)}</p>
        </div>
        <div className="split-line"></div>
        <div className="property__description">{property.description}</div>
        <div className="property__details-container">
          <h3 className="heading-2-small">Details</h3>
          <div className="split-line"></div>
          <div className="property__details">
            <p>
              <span>{property.area}</span> m<sup>2</sup>
            </p>
            <p>
              <span>{property.rooms} </span>Rooms
            </p>
            <p>
              <span> {property.bathrooms}</span> Bathrooms
            </p>
          </div>
        </div>
      </div>
    );
  }
}
