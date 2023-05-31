/* Losjes gebaseerd op https://socket.io/get-started/chat */

import * as path from "path";

import { Server } from "socket.io";
import { createServer } from "http";
import express from "express";

const app = express();
const http = createServer(app);
const ioServer = new Server(http);
const port = process.env.PORT || 4242;

// Stel de public map in
app.use(express.static("public"));

// Stel de view engine in
app.set("view engine", "ejs");
app.set("views", "./views");

// Maak een route voor de index

app.get("/", (request, response) => {
  response.render("index");
});

// Serveer client-side bestanden
app.use(express.static(path.resolve("public")));

// Start de socket.io server op
ioServer.on("connection", (client) => {
  // Log de connectie naar console
  console.log(`user ${client.id} connected`);

  // Luister naar een message van een gebruiker
  client.on("message", (message) => {
    // Log het ontvangen bericht
    console.log(`user ${client.id} sent message: ${message}`);

    // Verstuur het bericht naar alle clients
    ioServer.emit("message", message);
  });

  // Luister naar een disconnect van een gebruiker
  client.on("disconnect", () => {
    // Log de disconnect
    console.log(`user ${client.id} disconnected`);
  });
});

// Start een http server op het ingestelde poortnummer en log de url
http.listen(port, () => {
  console.log("listening on http://localhost:" + port);
});

// Maak een route voor de index

app.get("/", (request, response) => {
  response.render("index");
});

app.get("/alleproducten", (request, response) => {
  let productenUrl = url;
  fetchJson(productenUrl).then((data) => {
    response.render("alleproducten", data);
  });
});

app.get("/inloggen", (request, response) => {
  response.render("inloggen");
});

app.get("/ingelogd", (request, response) => {
  response.render("ingelogd");
});

app.get("/kalender", (request, response) => {
  response.render("kalender");
});

app.get("/profiel", (request, response) => {
  response.render("profiel");
});

app.get("/speciaalvoormini", (request, response) => {
  response.render("speciaalvoormini");
});

app.get("/test", (request, response) => {
  response.render("test");
});

app.get("/chat", (request, response) => {
  response.render("chat");
});
