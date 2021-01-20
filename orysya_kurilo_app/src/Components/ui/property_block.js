import React from "react";
import { ImgSrc, SvgIcons } from "../ui/icons";
import { formatMoney } from "../ui/misc";

const PropertyBlock = ({ property }) => {
  return (
    <div className="property">
      <ImgSrc
        src={property.url}
        alt={property.name}
        className="property__img"
      ></ImgSrc>
      {/* <SvgIcons className="property__like" name="icon-heart-full"></SvgIcons> */}

      <h5 className="property__name">{property.name}</h5>
      <div className="property__location">
        <SvgIcons name="icon-map-pin"></SvgIcons>
        <p>{property.city}</p>
      </div>
      <div className="property__rooms">
        <SvgIcons name="icon-profile-male"></SvgIcons>
        <p>{property.rooms} rooms</p>
      </div>
      <div className="property__area">
        <SvgIcons name="icon-expand"></SvgIcons>
        <p>
          {property.area} m<sup>2</sup>
        </p>
      </div>
      <div className="property__price">
        <SvgIcons name="icon-key"></SvgIcons>
        <p>${formatMoney(property.price)}</p>
      </div>
      {/* <button className="btn property__btn">View Property</button> */}
    </div>
  );
};

export default PropertyBlock;
