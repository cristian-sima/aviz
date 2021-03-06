// @flow

type InputTemplatePropTypes = {
  autoFocus?: boolean;
  input: any;
  label: string;
  placeholder: string;
  type: string;
  meta: {
    touched: boolean;
    error?: any;
    submitting: boolean;
  };
  left?: string;
  right?: string;

  onRegisterRef?: (callback : (node : any) => void) => void;
};

import React from "react";

import classnames from "classnames";

const InputTemplate = ({
  input,
  type,
  label,
  onRegisterRef,
  autoFocus,
  placeholder,
  left,
  right,
  meta: { submitting, touched, error },
} : InputTemplatePropTypes) => {

  const isInvalid = touched && error;

  return (
    <div className={classnames("form-group row", { "has-warning": touched && error })}>
      <label
        className={`${left ? left : "col-md-4"} text-md-right form-control-label`}
        htmlFor={input.name}>
        {label}
      </label>
      <div className={right ? right : "col-md-8"}>
        <input
          {...input}
          aria-label={label}
          autoFocus={autoFocus}
          className={classnames("form-control", { "is-invalid": isInvalid })}
          disabled={submitting}
          id={input.name}
          placeholder={placeholder}
          ref={onRegisterRef ? onRegisterRef : null}
          type={type}
        />
        <div className="invalid-feedback">
          {
            isInvalid && (
              <span>
                {error}
              </span>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default InputTemplate;
