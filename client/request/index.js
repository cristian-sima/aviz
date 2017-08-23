// @flow

type PerformLoginTypes = {
  Password: string;
  CaptchaSolution : string;
  Username: string;
};

type ChangePasswordTypes = { password: string; confirmation : string };

import agent from "superagent";

import { withPromiseCallback, normalizeArray } from "utility";

export const performLogin = (data : PerformLoginTypes) => new Promise((resolve, reject) => (
  agent.
    post("/api/login").
    send(data).
    type("form").
    end(withPromiseCallback(resolve, reject))
));


export const changePassword = (data : ChangePasswordTypes) => new Promise((resolve, reject) => (
  agent.
    post("/api/auth/changePassword").
    send(data).
    type("form").
    end(withPromiseCallback(resolve, reject))
));

export const signOff = () => new Promise((resolve, reject) => (
  agent.
    post("/api/auth/signOff").
    end(withPromiseCallback(resolve, reject))
));

export const performReconnect = () => new Promise((resolve, reject) => (
  agent.
    post("/api/auth/reconnect").
    end(withPromiseCallback(resolve, reject))
));

export const fetchUsers = () => new Promise((resolve, reject) => (
  agent.
    get("/api/users").
    type("json").
    end(
      withPromiseCallback(
        ({ Users }) => resolve(
          normalizeArray(Users)
        ),
        reject
      )
    )
));

export const fetchInstitutionss = () => new Promise((resolve, reject) => (
  agent.
    get("/api/institutions").
    type("json").
    end(
      withPromiseCallback(
        ({ Institutions }) => resolve(
          normalizeArray(Institutions)
        ),
        reject
      )
    )
));

export const resetPassword = (id : string) => new Promise((resolve, reject) => (
  agent.
    post(`api/users/${id}/reset-password`).
    end(withPromiseCallback(resolve, reject))
));
