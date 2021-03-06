// @flow

import type { State } from "types";

type SimpleSelector = (state : State, itemID : string) => any

import { createSelector } from "reselect";

import { getCurrentAccount } from "../auth";

const byIDsMapSelector = (state : State) => state.items.byID;

import { noError } from "utility";

export const getItem = (state : State, id : string) => (
  byIDsMapSelector(state).get(id)
);

export const getIsCurrentAccountAdvicer = createSelector(
  getItem,
  getCurrentAccount,
  (item, account) => (
    item &&
    item.has("advicers") &&
    item.get("advicers").includes(account.get("institutionID"))
  )
);

export const getIsFetchingItemDetailsError : SimpleSelector = createSelector(
  byIDsMapSelector,
  (state, id : string) => id,
  (byIDsMap, itemID) => {
    const ok = byIDsMap.has(itemID);

    if (!ok) {
      return false;
    }

    const item = byIDsMap.get(itemID),
      error = item.get("detailsFetchingError");

    return typeof error !== "undefined" && error !== noError;
  }
);

export const getIsFetchingItemDetails : SimpleSelector = createSelector(
  byIDsMapSelector,
  (state, itemID : string) => itemID,
  (byIDsMap, itemID) => {

    const ok = byIDsMap.has(itemID);

    if (!ok) {
      return true;
    }

    const item = byIDsMap.get(itemID);

    return item.get("detailsFetching") === true;
  }
);

export const getShouldFetchItemDetails : SimpleSelector = createSelector(
  byIDsMapSelector,
  (state, itemID : string) => itemID,
  (byIDsMap, itemID) => {
    const hasItem = byIDsMap.has(itemID);

    if (!hasItem) {
      return true;
    }

    const item = byIDsMap.get(itemID);

    return (
      !item.get("detailsFetching") &&
      !item.get("detailsFetched")
    );
  }
);

export const getAreFetchedItemDetails : SimpleSelector = createSelector(
  byIDsMapSelector,
  (state, itemID : string) => itemID,
  (byIDsMap, itemID) => {
    const hasItem = byIDsMap.has(itemID);

    if (!hasItem) {
      return false;
    }

    const item = byIDsMap.get(itemID);

    return (
      item.has("detailsFetched") &&
      item.get("detailsFetched") === true
    );
  }
);


export const getIsItemAdviced = createSelector(
  getItem,
  getCurrentAccount,
  (item, account) => (
    item &&
    item.has("responses") &&
    item.get("responses").includes(account.get("institutionID"))
  )
);
