// @flow

import type { ModalActionType } from "types";

import React from "react";

import LostPassword from "../Login/Modal/LostPassword";

import AddInstitution from "../Institutions/Modal/Add";
import ModifyInstitution from "../Institutions/Modal/Modify";
import DeleteInstitution from "../Institutions/Modal/Delete";
import InstitutionsContacts from "../Institutions/Modal/Contacts";

import ShowAccountsForInstitution from "../User/Modal/List";
import AddUser from "../User/Modal/Add";
import ModifyUser from "../User/Modal/Modify";
import DeleteUser from "../User/Modal/Delete";
import ConfirmResetUserPassword from "../User/Modal/ConfirmReset";

import ModifyItem from "../Item/Modal/Modify";
import DeleteItem from "../Item/Modal/Delete";
import DebateItem from "../Item/Modal/Debate";
import CreateVersion from "../Item/Modal/CreateVersion";
import CloseItem from "../Item/Modal/Close";
import ShowHistory from "../Item/Modal/ShowHistory";

const getComponent = (type : ModalActionType) : any => {
  switch (type) {

    case "LOST_PASSWORD":
      return LostPassword;

    case "ADD_INSTITUTION":
      return AddInstitution;

    case "MODIFY_INSTITUTION":
      return ModifyInstitution;

    case "DELETE_INSTITUTION":
      return DeleteInstitution;

    case "CONTACTS_FOR_INSTITUTIONS":
      return InstitutionsContacts;

    case "SHOW_USERS_FOR_INSTITUTION":
      return ShowAccountsForInstitution;

    case "ADD_USER":
      return AddUser;

    case "MODIFY_USER":
      return ModifyUser;

    case "DELETE_USER":
      return DeleteUser;

    case "DEBATE_ITEM":
      return DebateItem;

    case "CONFIRM_RESET_USER_PASSWORD":
      return ConfirmResetUserPassword;

    case "DELETE_ITEM":
      return DeleteItem;

    case "CREATE_VERSION":
      return CreateVersion;

    case "CLOSE_ITEM":
      return CloseItem;

    case "MODIFY_ITEM":
      return ModifyItem;

    case "SHOW_HISTORY":
      return ShowHistory;

    default:
      return (
        <div>
          {`Please define a modal component for the type [${type}] in Modal/components.jsx`}
        </div>
      );
  }
};

export default getComponent;
