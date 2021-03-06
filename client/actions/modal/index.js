// @flow

import type { Action, Emit } from "types";

export const createModal = (modalType : string, modalProps? : any) : Action => ({
  type    : "SHOW_MODAL",
  payload : {
    modalType,
    modalProps,
  },
});

export const hideModal = () : Action => ({
  type: "HIDE_MODAL",
});

export const showLostPasswordModal = () : Action => (
  createModal("LOST_PASSWORD")
);


export const showAddInstitutionFormModal = () : Action => (
  createModal("ADD_INSTITUTION")
);


export const modifyInstitutionModal = ({ id, cbAfter } : {
  id: string,
  cbAfter? : (institution : any) => void,
}) : Action => (
  createModal("MODIFY_INSTITUTION", {
    id,
    cbAfter,
  })
);

export const deleteInstitutionModal = (id : string) : Action => (
  createModal("DELETE_INSTITUTION", {
    id,
  })
);

export const showUsersForInstitutionModal = ({ institutionID } : {
  institutionID: string,
}) : Action => (
  createModal("SHOW_USERS_FOR_INSTITUTION", {
    institutionID,
  })
);

export const addUserModal = ({ institutionID } : { institutionID : string }) : Action => (
  createModal("ADD_USER", {
    institutionID,
  })
);

export const modifyUserModal = ({ id, cbAfter, institutionID } : {
  id: string,
  institutionID: string,
  cbAfter? : (user : any) => void,
}) : Action => (
  createModal("MODIFY_USER", {
    id,
    institutionID,
    cbAfter,
  })
);

export const deleteUserModal = ({ id, institutionID } : {
  id: string,
  institutionID: string,
}) : Action => (
  createModal("DELETE_USER", {
    id,
    institutionID,
  })
);

export const confirmResetPasswordModal = (id : string) : Action => (
  createModal("CONFIRM_RESET_USER_PASSWORD", {
    id,
  })
);


export const deleteItemModal = (id : string, emit : Emit) : Action => (
  createModal("DELETE_ITEM", {
    id,
    emit,
  })
);

export const createVersionModal = (id : string, emit : Emit) : Action => (
  createModal("CREATE_VERSION", {
    id,
    emit,
  })
);

export const debateItemModal = (id : string, emit : Emit) : Action => (
  createModal("DEBATE_ITEM", {
    id,
    emit,
  })
);

export const closeItemModal = (id : string, emit : Emit) : Action => (
  createModal("CLOSE_ITEM", {
    id,
    emit,
  })
);

export const modifyItemModal = (id : string, emit : Emit) : Action => (
  createModal("MODIFY_ITEM", {
    id,
    emit,
  })
);

export const showHistoryModal = (id : string) : Action => (
  createModal("SHOW_HISTORY", {
    id,
  })
);

export const showContactsForInstitutionModal = (id : string) : Action => (
  createModal("CONTACTS_FOR_INSTITUTIONS", {
    id,
  })
);
