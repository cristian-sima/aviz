// @flow

import type { ExpressServer, Database, Socket, Next } from "../types";

import createIO from "socket.io";

import addItem from "../items/add";
import adviceItem from "../items/advice";
import deleteItem from "../items/delete";
import createVersion from "../items/createVersion";
import closeItem from "../items/close";
import modifyItem from "../items/modify";
import debateItem from "../items/debate";

import { error, sessionMiddleware } from "../utility";

const performCreateIO = (server : ExpressServer, db : Database) => {
  const io = createIO(server);

  io.use((socket, next) => {
    sessionMiddleware(socket.request, socket.request.res, next);
  });

  io.use((socket : Socket, next : Next) => {
    const
      { request } = socket,
      { session } = request;

    const thereIsASession = (
      typeof session !== "undefined" &&
        typeof session.username !== "undefined"
    );

    if (thereIsASession) {
      const
        { username } = session,
        users = db.collection("users");

      return users.findOne({ username }, (errFindOne, user) => {
        if (errFindOne) {
          return next(error(errFindOne));
        }

        if (user) {
          socket.request.user = user;
          socket.request.session.user = user;
          socket.request.session.user.password = "";
        }

        return next();
      });
    }

    return next();
  });

  io.use(({ request : { session : { user } } }, next) => {
    if (user) {
      return next();
    }

    return next(new Error("Not connected"));
  });

  io.on("connection", (socket) => {

    const { user } = socket.request.session;

    socket.join(user.institutionID);

    socket.on("ADD_ITEM", addItem(socket, db, io));
    socket.on("DELETE_ITEM", deleteItem(socket, db, io));
    socket.on("ADVICE_ITEM", adviceItem(socket, db, io));
    socket.on("CREATE_VERSION", createVersion(socket, db, io));
    socket.on("CLOSE_ITEM", closeItem(socket, db, io));
    socket.on("MODIFY_ITEM", modifyItem(socket, db, io));
    socket.on("DEBATE_ITEM", debateItem(socket, db, io));
  });

  io.on("disconnect", (socket) => {
    const { user } = socket.request.session;

    socket.leave(user.institutionID);
  });
};

export default performCreateIO;
