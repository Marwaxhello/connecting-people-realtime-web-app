// socket

let socket = io();
let messages = document.querySelector(".message");
let input = document.querySelector("#message");
let feedback = document.querySelector("#feedback");
let count = document.querySelector("#count");

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  if (input.value) {
    socket.emit("message", input.value);
    input.value = "";
  }
});

socket.on("message", (message) => {
  addMessage(message);
});

socket.on("whatever", (message) => {
  addMessage(message);
});

socket.on("history", (history) => {
  history.forEach((message) => {
    addMessage(message);
  });
});

function addMessage(message) {
  messages.appendChild(
    Object.assign(document.createElement("li"), { textContent: message })
  );
  messages.scrollTop = messages.scrollHeight;
}

// Placeholder weg als je typt
const inputField = document.querySelector(".textfield");
inputField.addEventListener("focus", function () {
  inputField.removeAttribute("placeholder");
});
inputField.addEventListener("blur", function () {
  inputField.setAttribute("placeholder");
});

/*Aan het typen...*/
input.addEventListener("keypress", function () {
  socket.emit("typing", handle.value);
});

// NO WIFI

// Event listener voor successful connection
socket.on("connect", () => {
  console.log("Connected to the server");
});

// Event listener voor disconnection
socket.on("disconnect", () => {
  console.log("Disconnected from the server");
});

const connectionStatus = document.getElementById("connection-status");

socket.on("connect", () => {
  connectionStatus.textContent = "Connected to the server";
});

socket.on("disconnect", () => {
  connectionStatus.textContent =
    "Connection lost. Please check your internet connection.";
});

socket.on("error", (error) => {
  console.error("Socket error:", error);
  // Additional error handling logic
});

/*De form haal de bericht op die in de ejs staat via de server */
document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  socket.emit(".message", {
    /*In de ejs haalt hij de waarde van de gebruiker op(gebruiksnaam) en de input(bericht)*/
    input: input.value,
    handle: handle.value,
    /*haalt de tijd op mee mee te sturen met het bericht*/
    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }) /*tijd bij de bericht*/,
  });
  /*De value is wat de gebruiker als bericht wilt sturen*/
  input.value = "";
});
/*bericht verstuurd met gebruiksnaam en tijd*/
socket.on(".message", (data) => {
  feedback.innerHTML = "";
  /*hier geeft ie aan hoe de layout eruit gaat zien waneer de bericht wordt gestuurd*/
  messages.innerHTML += `
  <div class="message-background">
    <p>${data.input} <span class="time">${data.time}</span></p>
  </div>
  <h3 class="message-handle">${data.handle}</h3>
  `;
  /*section krijgt scrol functie voor de berichten*/
  messages.scrollTop = messages.scrollHeight;
});
