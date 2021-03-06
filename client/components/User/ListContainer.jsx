// @flow

import type { Dispatch, State } from "types";

type UserListPropTypes = {
  users: any;
  institutionID: string;

  confirmReset: (id : string) => () => void;
  showModifyModal: (id : string) => () => void;
  showDeleteModal: (id : string) => () => void;
  showCreateUserModal: () => void;
};

type OwnProps = {
  institutionID: string;
};

import { Button } from "reactstrap";
import { connect } from "react-redux";
import React from "react";

import List from "./List";

import {
  deleteUserModal as deleteUserAction,
  addUserModal as showAddUserAction,
  modifyUserModal as modifyUserAction,
  confirmResetPasswordModal as confirmResetPasswordModalAction,
  hideModal,
} from "actions";

import {
  getUsersByInstitution,
} from "reducers";


const
  mapStateToProps = (state : State, { institutionID } : OwnProps) => ({
    users: getUsersByInstitution(state, institutionID),
  }),
  mapDispatchToProps = (dispatch : Dispatch, { institutionID } : OwnProps) => ({
    showDeleteModal: (id : string) => () => {
      dispatch(deleteUserAction({
        id,
        institutionID,
      }));
    },
    confirmReset: (id : string) => () => {
      dispatch(confirmResetPasswordModalAction(id));
    },
    showModifyModal: (id : string) => () => {
      dispatch(modifyUserAction({
        id,
        institutionID,
        cbAfter: () => {
          dispatch(hideModal());
        },
      }));
    },
    showCreateUserModal: () => dispatch(showAddUserAction({ institutionID })),
  });

class UserList extends React.Component<UserListPropTypes> {

  props: UserListPropTypes;

  shouldComponentUpdate (nextProps) {
    return (
      nextProps.users !== this.props.users ||
      nextProps.institutionID !== this.props.institutionID
    );
  }

  render () {
    const {
      users,
      showDeleteModal,
      showCreateUserModal,
      showModifyModal,
      confirmReset,
    } = this.props;

    if (users.size === 0) {
      return (
        <div className="my-3 my-md-5">
          <div className="text-center fancy-text">
            {"Nu există conturi"}
          </div>
          <div className="text-center mt-2">
            <Button
              className="mt-md-3"
              color="success"
              onClick={showCreateUserModal}>
              {"Creează cont"}
            </Button>
          </div>
        </div>
      );
    }

    return (
      <List
        confirmReset={confirmReset}
        showCreateUserModal={showCreateUserModal}
        showDeleteModal={showDeleteModal}
        showModifyModal={showModifyModal}
        users={users}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
