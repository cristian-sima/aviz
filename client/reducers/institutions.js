// @flow

import type { State, InstitutionsState } from "types";

import * as Immutable from "immutable";
import { createSelector } from "reselect";

import { noError } from "utility";

const newInitialState = () => ({
  fetched       : false,
  fetching      : false,
  errorFetching : noError,

  isResetingPassword: false,

  data: Immutable.Map(),
});

const
  fetchInstitutionsPending = (state : InstitutionsState) => ({
    ...state,
    fetching      : true,
    errorFetching : noError,
  }),
  fetchInstitutionsRejected = (state : InstitutionsState, { payload : { error } }) => ({
    ...state,
    fetching      : false,
    errorFetching : error,
  }),
  fetchInstitutionsFulfilled = (state : InstitutionsState, { payload }) => ({
    ...state,
    fetched  : true,
    fetching : false,

    data: payload.entities,
  });


const reducer = (state : InstitutionsState = newInitialState(), action : any) => {
  switch (action.type) {
    case "FETCH_INSTITUTIONS_PENDING":
      return fetchInstitutionsPending(state);

    case "FETCH_INSTITUTIONS_REJECTED":
      return fetchInstitutionsRejected(state, action);

    case "FETCH_INSTITUTIONS_FULFILLED":
      return fetchInstitutionsFulfilled(state, action);

    case "SIGN_OFF_FULFILLED":
      return newInitialState();

    default:
      return state;
  }
};

const
  getFetching = (state : State) => state.institutions.fetching,
  getFetched = (state : State) => state.institutions.fetched,
  getError = (state : State) => state.institutions.errorFetching,
  getData = (state : State) => state.institutions.data;

export const
  getInstitutions = createSelector(
    getData,
    (map) => map.toList().sortBy(
      (institution) => institution.get("marca")
    )
  );

export const getInstitutionsAreFetched = createSelector(
  getFetching,
  getFetched,
  getError,
  (isFetching, isFetched, error) => (
    !isFetching && isFetched && error === noError
  )
);

export const getInstitutionsAreFetching = createSelector(
  getFetching,
  getError,
  (isFetching, error) => (
    isFetching && error === noError
  )
);

export const getInstitutionsHasError = createSelector(
  getError,
  (error) => error !== noError
);

export const getInstitutionsShouldFetch = createSelector(
  getInstitutionsAreFetched,
  getInstitutionsAreFetching,
  (isFetched, isFetching) => (
    !isFetched && !isFetching
  )
);

export default reducer;