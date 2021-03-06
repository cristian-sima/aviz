/* eslint-disable no-undefined, no-magic-numbers */

import reducer from "./modal";

import * as Immutable from "immutable";

import { hideModal } from "actions";

describe("account/modal reducer", () => {

  it("returns the initial state", () => {
    const result = reducer(undefined, { type: "" });

    expect(result).toEqual(Immutable.List());
  });

  it("handles SHOW_MODAL", () => {
    const result = reducer(undefined, {
      type    : "SHOW_MODAL",
      payload : {
        modalType  : "ADD_ARTICLE",
        modalProps : {
          ID: 1,
        },
      },
    });

    expect(result).toEqual(Immutable.List([
      {
        type  : "ADD_ARTICLE",
        props : {
          ID: 1,
        },
      },
    ]));
  });

  it("handles HIDE_MODAL", () => {
    const
      initialState = Immutable.List([
        {
          type  : "LIST_ARTICLES",
          props : {},
        },
        {
          type  : "ADD_ARTICLE",
          props : {
            ID: 1,
          },
        },
      ]),
      result = reducer(initialState, hideModal());

    expect(result).toEqual(Immutable.List([
      {
        type  : "LIST_ARTICLES",
        props : {},
      },
    ]));
  });

  it("handles @@router/LOCATION_CHANGE", () => {
    const
      initialState = Immutable.List([
        {
          type  : "ADD_ARTICLE",
          props : {
            ID: 1,
          },
        },
        {
          type  : "LIST_ARTICLES",
          props : {},
        },
      ]),
      result = reducer(initialState, {
        type: "@@router/LOCATION_CHANGE",
      });

    expect(result).toEqual(Immutable.List([]));
  });
});
