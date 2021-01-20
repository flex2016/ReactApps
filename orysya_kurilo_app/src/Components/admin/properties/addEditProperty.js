import React, { Component } from "react";
import AdminLayout from "../../../Hoc/AdminLayout";

import FormField from "../../ui/formFields";
import { validate, formatMoney } from "../../ui/misc";
import Fileuploader from "../../ui/fileuploader";

import { firebaseDB, firebaseProperties, firebase } from "../../../firebase";
import { firebaseLooper } from "../../ui/misc";

class AddEditProperty extends Component {
  state = {
    propertyId: "",
    formType: "",
    formError: false,
    formSuccess: "",
    defaultImg: "",
    formdata: {
      date: {
        element: "input",
        value: "",
        config: {
          class: "form__input",
          label: "Date Listed",
          name: "date_input",
          type: "date"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showlabel: true
      },
      name: {
        element: "input",
        showlabel: true,
        value: "",
        config: {
          class: "form__input",
          label: "Property Name",
          placeholder: "Property Name",
          name: "name_input",
          type: "text"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: ""
      },
      address: {
        element: "input",
        value: "",
        config: {
          class: "form__input",
          label: "Property Address",
          placeholder: "Property Address",
          name: "address_input",
          type: "text"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showlabel: true
      },
      city: {
        element: "input",
        value: "",
        config: {
          class: "form__input",
          label: "City",
          name: "city_input",
          placeholder: "City",
          type: "text"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showlabel: true
      },
      rooms: {
        element: "input",
        value: "",
        config: {
          class: "form__input",
          label: "Rooms",
          name: "room_input",
          placeholder: "Rooms",
          type: "text",
          pattern: "[0-9]*"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showlabel: true
      },
      bathrooms: {
        element: "input",
        value: "",
        config: {
          class: "form__input",
          label: "Bathrooms",
          name: "bathrooms_input",
          placeholder: "Bathrooms",
          type: "text",
          pattern: "[0-9]*"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showlabel: true
      },
      area: {
        element: "input",
        value: "",
        config: {
          class: "form__input",
          label: "Area",
          name: "area_input",
          placeholder: "Area",
          type: "text",
          pattern: "[0-9]*"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showlabel: true
      },
      price: {
        element: "input",
        value: "",
        config: {
          class: "form__input",
          label: "Price",
          name: "price_input",
          placeholder: "Price",
          type: "text",
          pattern: "[0-9]*"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showlabel: true
      },
      sold: {
        element: "select",
        value: "",
        config: {
          class: "form__input",
          label: "Property Sold?",
          name: "select_sold",
          type: "select",
          options: [
            { key: "Yes", value: "Yes" },
            { key: "No", value: "No" }
          ]
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showlabel: true
      },
      description: {
        element: "textarea",
        value: "",
        showlabel: true,
        config: {
          class: "form__input",
          name: "description_input",
          rows: 6,
          type: "text",
          placeholder: "Property Description",
          label: "Description"
        },
        validation: {
          required: true,
          minLength: 20
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      image: {
        element: "image",
        value: "",
        validation: {
          required: true
        },
        valid: false
      },
      url: {
        element: "url",
        value: "",
        validation: {
          required: true
        },
        valid: false
      }
    }
  };

  updateForm(element, content = "") {
    const newFormdata = { ...this.state.formdata };
    const newElement = { ...newFormdata[element.id] };

    if (content === "") {
      newElement.value = element.event.target.value;
    } else {
      newElement.value = content;
    }
    //console.log(content);
    let validData = validate(newElement);
    newElement.valid = validData[0];
    newElement.validationMessage = validData[1];
    newFormdata[element.id] = newElement;
    this.setState({
      formError: false,
      formdata: newFormdata
    });
  }

  updateFields(property, propertyId, formType, defaultImg) {
    const newFormdata = {
      ...this.state.formdata
    };

    for (let key in newFormdata) {
      newFormdata[key].value = property[key];
      newFormdata[key].valid = true;
      // if (newFormdata[key].element === "url") {
      //   newFormdata.url.value = defaultImg;
      // }
    }
    console.log(defaultImg);
    this.setState({
      propertyId,
      defaultImg,
      formType: formType,
      formdata: newFormdata
    });
  }

  componentDidMount() {
    const propertyId = this.props.match.params.id;
    if (!propertyId) {
      this.setState({
        formType: "Add Property"
      });
    } else {
      firebaseDB
        .ref(`properties/${propertyId}`)
        .once("value")
        .then(snapshot => {
          const propertyData = snapshot.val();
          // console.log(property);

          firebase
            .storage()
            .ref("properties")
            .child(propertyData.image)
            .getDownloadURL()
            .then(url => {
              this.updateFields(propertyData, propertyId, "Edit Property", url);
            })
            .catch(e => {
              this.updateFields(
                { ...propertyData, image: "" },
                propertyId,
                "Edit Property",
                ""
              );
            });
        });
    }
  }

  successForm(message) {
    this.setState({
      formSuccess: message
    });

    setTimeout(() => {
      this.setState({
        formSuccess: ""
      });
    }, 2000);
  }

  submitForm(event) {
    event.preventDefault();

    let dataToSubmit = {};
    let formIsValid = true;
    for (let key in this.state.formdata) {
      dataToSubmit[key] = this.state.formdata[key].value;
      formIsValid = this.state.formdata[key].valid && formIsValid;
    }
    console.log("submitted data");
    console.log(dataToSubmit);
    if (formIsValid) {
      if (this.state.formType === "Edit Property") {
        firebaseDB
          .ref(`properties/${this.state.propertyId}`)
          .update(dataToSubmit)
          .then(() => {
            this.successForm("Updated correctly");
          })
          .catch(e => {
            this.setState({ formError: true });
          });
      } else {
        firebaseProperties
          .push(dataToSubmit)
          .then(() => {
            this.props.history.push("/admin_properties");
          })
          .catch(e => {
            console.log(e);
            this.setState({ formError: true });
          });
      }
    } else {
      this.setState({
        formError: true
      });
    }
  }
  resetImage = () => {
    const newFormdata = { ...this.state.formdata };
    console.log(newFormdata);
    firebase
      .storage()
      .ref(`properties/${newFormdata["image"].value}`)
      .delete()
      .then(() => {
        this.successForm("Deleted");
      })
      .catch(e => {
        console.log(e);
        // this.setState({ formError: true });
      });
    newFormdata["image"].value = "";
    newFormdata["image"].valid = false;

    this.setState({
      defaultImg: "",
      formdata: newFormdata
    });
  };

  storeFilename = filename => {
    this.updateForm({ id: "image" }, filename);
  };
  handleUrl = url => {
    var formdata = { ...this.state.formdata };
    formdata.url.value = url;
    formdata.url.valid = true;
    this.setState({ formdata });
    //console.log(formdata);
  };

  render() {
    console.log("state");
    console.log(this.state);
    return (
      <AdminLayout>
        <div className="editproperty__wrapper">
          <h2 className="heading-2">{this.state.formType}</h2>
          <div>
            <form
              onSubmit={event => this.submitForm(event)}
              className="form__wrapper"
            >
              <div className="form__fields">
                <Fileuploader
                  dir="properties"
                  tag={"Property image"}
                  defaultImg={this.state.defaultImg}
                  defaultImgName={this.state.formdata.image.value}
                  resetImage={() => this.resetImage()}
                  filename={filename => this.storeFilename(filename)}
                  handleUrl={url => this.handleUrl(url)}
                />

                <FormField
                  id={"date"}
                  formdata={this.state.formdata.date}
                  change={element => this.updateForm(element)}
                />
                <FormField
                  id={"name"}
                  formdata={this.state.formdata.name}
                  change={element => this.updateForm(element)}
                />
                <FormField
                  id={"address"}
                  formdata={this.state.formdata.address}
                  change={element => this.updateForm(element)}
                />
                <FormField
                  id={"city"}
                  formdata={this.state.formdata.city}
                  change={element => this.updateForm(element)}
                />
                <FormField
                  id={"rooms"}
                  formdata={this.state.formdata.rooms}
                  change={element => this.updateForm(element)}
                />
              </div>
              <div className="form__fields">
                <FormField
                  id={"bathrooms"}
                  formdata={this.state.formdata.bathrooms}
                  change={element => this.updateForm(element)}
                />
                <FormField
                  id={"area"}
                  formdata={this.state.formdata.area}
                  change={element => this.updateForm(element)}
                />
                <FormField
                  id={"price"}
                  formdata={this.state.formdata.price}
                  change={element => this.updateForm(element)}
                />
                <FormField
                  id={"sold"}
                  formdata={this.state.formdata.sold}
                  change={element => this.updateForm(element)}
                />
                <FormField
                  id={"description"}
                  formdata={this.state.formdata.description}
                  change={element => this.updateForm(element)}
                />
              </div>

              <button
                className="btn__big"
                onClick={event => this.submitForm(event)}
              >
                {this.state.formType}
              </button>
              <div className="success_label">{this.state.formSuccess}</div>
              {this.state.formError ? (
                <div className="error_label">Something is wrong</div>
              ) : (
                ""
              )}
            </form>
          </div>
        </div>
      </AdminLayout>
    );
  }
}

export default AddEditProperty;
