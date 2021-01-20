import React from "react";

const FormField = ({ formdata, id, change }) => {
  const showError = () => {
    let errorMessage = null;

    if (formdata.validation && !formdata.valid) {
      errorMessage = (
        <div className="error_label">{formdata.validationMessage}</div>
      );
    }

    return errorMessage;
  };

  const renderTemplate = () => {
    let formTemplate = null;

    switch (formdata.element) {
      case "input":
        formTemplate = (
          <>
            <input
              {...formdata.config}
              value={formdata.value}
              onBlur={event => change({ event, id, blur: true })}
              onChange={event => change({ event, id })}
            />
            {formdata.showlabel ? (
              <div className="form__label">{formdata.config.label}</div>
            ) : null}
            {showError()}
          </>
        );
        break;
      case "select":
        formTemplate = (
          <>
            <select
              className="form__request"
              value={formdata.value}
              onBlur={event => change({ event, id, blur: true })}
              onChange={event => change({ event, id })}
            >
              <option value="">Select one</option>
              {formdata.config.options.map(item => (
                <option key={item.key} value={item.key}>
                  {item.value}
                </option>
              ))}
            </select>
            {formdata.showlabel ? (
              <div className="form__label">{formdata.config.label}</div>
            ) : null}
            {showError()}
          </>
        );
        break;
      case "textarea":
        formTemplate = (
          <>
            <textarea
              {...formdata.config}
              value={formdata.value}
              onBlur={event => change({ event, id, blur: true })}
              onChange={event => change({ event, id })}
            />
            {formdata.showlabel ? (
              <div className="form__label">{formdata.config.label}</div>
            ) : null}
            {showError()}
          </>
        );
        break;
      default:
        formTemplate = null;
    }
    return formTemplate;
  };

  return <div className="form__group">{renderTemplate()}</div>;
};

export default FormField;
