// @flow
/* eslint-disable no-console */

import type { Database } from "./types";

import express from "express";
import { MongoClient } from "mongodb";

import render from "./code/app";
import routes from "./routes";
import { port as appPort, dbPort, isProduction } from "../config-server";

import createIO from "./io";

const StatusNotWorking = 500;

const url = `mongodb://localhost:${dbPort}/aviz`;

MongoClient.connect(url, (errConnectDatabase? : Error, db : Database) => {
  if (errConnectDatabase) {
    console.log(errConnectDatabase);
  }

  const app = express();

  app.use((req, res, next) => {
    req.db = db;
    next();
  });

  const staticPath = isProduction ? "dist" : "server";

  app.use("/static", express.static(`${staticPath}/static`));
  app.use("/media", express.static("media"));
  app.use("/api", routes);
  app.use("/", render);

  /* eslint-disable no-unused-vars */
  app.use((err, req, res, next) => {

    console.error(err.stack);

    res.status(StatusNotWorking).send("Ceva nu a mers exact cum trebuia!");
  });

  app.use((err, req, res, next) => {
    if (req.xhr) {
      return res.status(StatusNotWorking).send({ error: "Ceva nu a mers exact cum trebuia!" });
    }

    return next(err);
  });

  const server = app.listen(appPort, () => {
    const { port } = server.address();

    createIO(server, db);

    console.log(`Backend server is up at port ${port}`);
  });
});
