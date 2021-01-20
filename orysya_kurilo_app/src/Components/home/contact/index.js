import React, { Component } from "react";
import Fade from "react-reveal/Fade";
import FormField from "../../ui/formFields";
import { validate } from "../../ui/misc";

import { firebaseContact } from "../../../firebase";

class Contact extends Component {
  state = {
    formError: false,
    formSuccess: "",
    formdata: {
      name: {
        element: "input",
        value: "",
        showlabel: true,
        config: {
          className: "form__input",
          name: "name_input",
          type: "text",
          placeholder: "Enter your Full Name",
          label: "Full Name",
        },
        validation: {
          required: true,
          minLength: 3,
        },
        valid: false,
        touched: false,
        validationMessage: "",
      },
      email: {
        element: "input",
        value: "",
        showlabel: true,
        config: {
          className: "form__input",
          name: "email__input",
          type: "email",
          placeholder: "Enter your email",
          label: "Email Address",
        },
        validation: {
          required: true,
          email: true,
        },
        valid: false,
        validationMessage: "",
      },
      request: {
        element: "select",
        value: "",
        config: {
          className: "request__input",
          name: "request__input",
          type: "select",
          options: [
            { key: "Rent", value: "Rent" },
            { key: "Buy", value: "Buy" },
            { key: "Sell", value: "Sell" },
          ],
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: "",
      },
      message: {
        element: "textarea",
        value: "",
        showlabel: true,
        config: {
          className: "form__input",
          name: "message_input",
          rows: 6,
          type: "text",
          placeholder: "Enter your message here",
          label: "Message",
        },
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
        validationMessage: "",
      },
    },
  };

  updateForm(element) {
    const newFormdata = { ...this.state.formdata };
    const newElement = { ...newFormdata[element.id] };

    newElement.value = element.event.target.value;

    if (element.blur) {
      let validData = validate(newElement);
      newElement.valid = validData[0];
      newElement.validationMessage = validData[1];
    }

    newElement.touched = element.blur;
    newFormdata[element.id] = newElement;

    this.setState({
      formError: false,
      formdata: newFormdata,
    });
  }

  resetFormSuccess(type) {
    const newFormdata = { ...this.state.formdata };

    for (let key in newFormdata) {
      newFormdata[key].value = "";
      newFormdata[key].valid = false;
      newFormdata[key].validationMessage = "";
    }

    this.setState({
      formError: false,
      formdata: newFormdata,
      formSuccess: type ? "Congratulations" : "Something Went Wrong",
    });
    this.successMessage();
  }

  successMessage() {
    setTimeout(() => {
      this.setState({
        formSuccess: "",
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
    if (formIsValid) {
      firebaseContact.push(dataToSubmit);
      this.resetFormSuccess(true);
    } else {
      this.setState({
        formError: true,
      });
    }
  }

  render() {
    return (
      <div className="contact" id="contact">
        <Fade>
          <form onSubmit={(event) => this.submitForm(event)}>
            <h3 className="heading-2 mb-sm">Contact Now!</h3>

            <FormField
              id={"name"}
              formdata={this.state.formdata.name}
              change={(element) => this.updateForm(element)}
            />

            <FormField
              className="form__input"
              id={"email"}
              formdata={this.state.formdata.email}
              change={(element) => this.updateForm(element)}
            />
            <FormField
              id={"request"}
              formdata={this.state.formdata.request}
              change={(element) => this.updateForm(element)}
            />
            <FormField
              id={"message"}
              formdata={this.state.formdata.message}
              change={(element) => this.updateForm(element)}
            />
            {this.state.formError ? (
              <div className="error_label">Something is wrong, try again.</div>
            ) : null}
            <div className="success_label">{this.state.formSuccess}</div>
            <button
              className="btn form__btn"
              onClick={(event) => this.submitForm(event)}
            >
              Send Request!
            </button>
          </form>
        </Fade>
      </div>
    );
  }
}

export default Contact;
