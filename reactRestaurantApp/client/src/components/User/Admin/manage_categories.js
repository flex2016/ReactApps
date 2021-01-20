import React, { Component } from "react";

import FormField from "../../utils/Form/formfield";
import {
  update,
  generateData,
  isFormValid,
  resetFields,
} from "../../utils/Form/formActions";

import { connect } from "react-redux";
import { getCategories, addCategory } from "../../../actions/menu_actions";

class ManageCategories extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formdata: {
      name: {
        element: "input",
        value: "",
        config: {
          label: "Category Name",
          name: "name_input",
          type: "text",
          placeholder: "Enter the Category",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
      },
    },
  };

  showCategoryItems = () =>
    this.props.menuItems.categories
      ? this.props.menuItems.categories.map((item, i) => (
          <div className="category_item" key={item._id}>
            {item.name}
          </div>
        ))
      : null;

  updateForm = (element) => {
    const newFormdata = update(element, this.state.formdata, "categories");
    this.setState({
      formError: false,
      formdata: newFormdata,
    });
  };

  resetFieldsHandler = () => {
    const newFormData = resetFields(this.state.formdata, "categories");

    this.setState({
      formdata: newFormData,
      formSuccess: true,
    });
  };

  submitForm = (event) => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formdata, "categories");
    let formIsValid = isFormValid(this.state.formdata, "categories");
    let existingCategories = this.props.menuItems.categories;

    if (formIsValid) {
      this.props
        .dispatch(addCategory(dataToSubmit, existingCategories))
        .then((response) => {
          if (response.payload.success) {
            this.resetFieldsHandler();
          } else {
            this.setState({ formError: true });
          }
        });
    } else {
      this.setState({
        formError: true,
      });
    }
  };

  componentDidMount() {
    this.props.dispatch(getCategories());
  }

  render() {
    return (
      <div className="admin_category_wrapper">
        <h1>Menu Categories</h1>
        <div className="admin_two_column">
          <div className="left">
            <div className="brands_container">{this.showCategoryItems()}</div>
          </div>
          <div className="right">
            <form onSubmit={(event) => this.submitForm(event)}>
              <FormField
                id={"name"}
                formdata={this.state.formdata.name}
                change={(element) => this.updateForm(element)}
              />

              {this.state.formError ? (
                <div className="error_label">Please check your data</div>
              ) : null}
              <button onClick={(event) => this.submitForm(event)}>
                Add Category
              </button>
            </form>
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

export default connect(mapStateToProps)(ManageCategories);
