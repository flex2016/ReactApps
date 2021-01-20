import React, { Component } from "react";
import { Link } from "react-router-dom";
import { firebaseProperties, firebase } from "../../../firebase";
import Fade from "react-reveal/Fade";

import { firebaseLooper, reverseArray } from "../../ui/misc";
import CircularProgress from "@material-ui/core/CircularProgress";
import PropertyBlock from "../../ui/property_block";
import { Promise } from "core-js";

class Properties extends Component {
  state = {
    loading: true,
    properties: []
  };

  componentDidMount() {
    firebaseProperties
      .limitToLast(6)
      .once("value")
      .then(snapshot => {
        const properties = firebaseLooper(snapshot);
        this.setState({
          loading: false,
          properties: properties
        });
        // let promises = [];

        // for (let key in properties) {
        //   promises.push(
        //     new Promise((resolve, reject) => {
        //       firebase
        //         .storage()
        //         .ref("properties")
        //         .child(properties[key].image)
        //         .getDownloadURL()
        //         .then(url => {
        //           properties[key].url = url;
        //           resolve();
        //         });
        //     })
        //   );
        // }
        // Promise.all(promises).then(() => {
        //   this.setState({
        //     loading: false,
        //     properties: properties
        //   });
        // });
      });
  }

  showProperties = properties =>
    properties
      ? properties.map(property => (
          <Fade key={property.id}>
            <Link to={`/the_properties/${property.id}`}>
              <PropertyBlock property={property} />
            </Link>
          </Fade>
        ))
      : null;

  render() {
    console.log(this.state.properties);
    return (
      <div className="properties">
        {!this.state.loading ? (
          <>{this.showProperties(this.state.properties)}</>
        ) : (
          <CircularProgress
            size={60}
            thickness={7}
            style={{ color: "#c69963" }}
          />
        )}
      </div>
    );
  }
}

export default Properties;
