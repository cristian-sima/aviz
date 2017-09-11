// @flow

import React from "react";

type AuthorsBoxPropTypes = {
  institutions: any;
  authors: any;
};

type AuthorsBoxStateTypes = {
  isOpen: boolean;
}

import { Collapse } from "reactstrap";

class AuthorsBox extends React.Component {
  props: AuthorsBoxPropTypes;
  state: AuthorsBoxStateTypes;

  toggle: () => void;

  constructor (props : AuthorsBoxPropTypes) {
    super(props);

    this.state = {
      isOpen: false,
    };

    this.toggle = () => this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  shouldComponentUpdate (
    nextProps : AuthorsBoxPropTypes,
    nextState : AuthorsBoxStateTypes
  ) {
    return (
      this.props.institutions !== nextProps.institutions ||
      this.props.authors !== nextProps.authors ||

      this.state.isOpen !== nextState.isOpen
    );
  }

  render () {
    const { institutions, authors } = this.props;
    const { isOpen } = this.state;

    const justOne = authors.size === 1;

    return (
      <div>
        {
          justOne ? (
            institutions.getIn([
              authors.first(),
              "name",
            ])
          ) : (
            <div>
              {`${authors.size} inițiatori`}
              <button
                className="btn btn-link text-muted"
                onClick={this.toggle}
                type="button">
                {
                  isOpen ? "Ascunde" : (
                    "Afișează instituții"
                  )
                }
              </button>
              <Collapse isOpen={isOpen}>
                <div className="small">
                  {
                    authors.map((author) => (
                      <div key={author}>
                        <span>{"- "}</span>
                        {
                          institutions.getIn([
                            author,
                            "name",
                          ])
                        }
                      </div>
                    ))
                  }
                </div>
              </Collapse>
            </div>
          )
        }
      </div>
    );
  }
}

export default AuthorsBox;
