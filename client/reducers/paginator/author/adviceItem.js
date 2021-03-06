// @flow

import type { State } from "types";

import getShouldModify from "../util/getShouldModify";

const adviceItem = (state : State, action : any) => {

  const
    { items, versions : versionsState } = state,
    { byID, started } = items,
    { payload : { item, versions : rawVersions } } = action;

  const
    _id = item.get("_id"),
    currentVersion = item.get("version");

  const
    versions = rawVersions.entities,
    version = versions.first(),
    currentInstitutionID = version.get("institutionID");

  const
    shouldModify = (
      byID.has(_id) &&
      byID.get(_id).has("detailsFetched")
    ) || getShouldModify([started.IDs], _id);

  const newByID = shouldModify ? (
    byID.update(_id, (current) => {
      if (typeof current === "undefined") {
        return current;
      }

      const
        responses = current.get("responses"),
        needsExamination = item.get("needsExamination"),
        allAdvices = current.get("allAdvices");

      const newResponses = responses.includes(currentInstitutionID) ? (
        responses
      ) : (
        responses.push(currentInstitutionID)
      );

      const newAllAdvices = allAdvices.includes(currentInstitutionID) ? (
        allAdvices
      ) : (
        allAdvices.push(currentInstitutionID)
      );

      return current.merge({
        responses  : newResponses,
        allAdvices : newAllAdvices,
        needsExamination,
      });
    })
  ) : byID;

  const newVersions = shouldModify ? (
    versionsState.has(_id) ? (
      versionsState.update(_id, (currentState) => {
        if (typeof currentState === "undefined") {
          return versions;
        }

        return currentState.filter((current) => (
          !(
            current.get("version") === currentVersion &&
            current.get("institutionID") === currentInstitutionID
          )
        )).set(version.get("_id"), version);
      })
    ) : versionsState.set(_id, versions)
  ) : versionsState;

  return {
    ...state,
    items: {
      ...items,
      byID: newByID,
    },
    versions: newVersions,
  };
};

export default adviceItem;
