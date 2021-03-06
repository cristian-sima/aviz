// @flow

type FormPropTypes = {
  buttonLabel: string;
  error?: string;
  pristine: boolean;
  submitting: boolean;
  title: string;
  advicers: any;
  institutionID: string;
  form: string;

  handleRegisterRef?: (node: any) => void;
  handleSubmit: (formData : any) => Promise<*>;
};

type FormStateTypes = {
  showAuthors: boolean;
};

import { Field, FieldArray } from "redux-form/immutable";
import React from "react";
import { Collapse } from "reactstrap";

import FocusTextarea from "../../Inputs/FocusTextarea";

import AuthorsArray from "./Authors";
import AdvicersArray from "./Advicers";

export { validate } from "./validate";

class Form extends React.Component<FormPropTypes, FormStateTypes> {

  props: FormPropTypes;
  state: FormStateTypes;

  field: any;

  focusNameInput: () => void;
  toggleAuthors: () => void;
  handleSubmitForm: (data : any) => void;
  handleRegisterRef: (node : any) => void;

  constructor (props : FormPropTypes) {
    super(props);

    this.state = {
      showAuthors: false,
    };

    this.handleRegisterRef = (node : any) => {
      this.field = node;
    };

    this.focusNameInput = () => {
      setTimeout(() => {
        const { field } = this;

        if (field && field !== null) {
          field.focus();
        }
      });
    };

    this.toggleAuthors = () => this.setState((prevState) => ({
      showAuthors: !prevState.showAuthors,
    }));
  }

  componentDidMount () {
    setTimeout(() => {
      const { field } = this;

      if (field !== null && typeof field !== "undefined") {
        field.focus();
      }
    });
  }

  render () {
    const {
      buttonLabel,
      error,
      pristine,
      title,
      submitting,
      institutionID,
      handleSubmit,
      form,
    } = this.props;

    const { showAuthors } = this.state;

    const errMessage = (
      <div className="alert alert-danger">
        {error}
      </div>
    );

    const getButtonContent = () => {
      if (submitting) {
        return (
          <span>
            <i className="fa fa-refresh fa-spin fa-fw" />
            {" Așteaptă"}
          </span>
        );
      }

      return buttonLabel;
    };

    return (
      <div className="container">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className="text-center">
            <h2>
              {title}
            </h2>
          </div>
          {error && errMessage}
          <div className="row">
            <div className="col-md-2" />
            <div className="col-md-10 col-xl-8">
              <div className="text-right">
                <button
                  className="btn btn-link"
                  onClick={this.toggleAuthors}
                  type="button">
                  {
                    showAuthors ? "Ascunde coinițiatori" : "Afișează coinițiatori"
                  }
                </button>
              </div>
            </div>
          </div>
          <Collapse isOpen={showAuthors}>
            <FieldArray
              component={AuthorsArray}
              form={form}
              institutionID={institutionID}
              name="authors"
            />
          </Collapse>
          <Field
            component={FocusTextarea}
            label="Titlu"
            left="col-md-2"
            name="name"
            onRegisterRef={this.handleRegisterRef}
            right="col-md-10 col-xl-8"
            rows="10"
            withRef
          />
          <FieldArray
            component={AdvicersArray}
            form={form}
            name="advicers"
          />
          <div className="text-center">
            <button
              aria-label={buttonLabel}
              className="btn btn-primary"
              disabled={pristine || submitting}
              type="submit">
              {getButtonContent()}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Form;
