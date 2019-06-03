//Importar los modulos de express, Http y socket.io

const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

//Crear una coneccion con el index en peticion por get

app.get("/", function(req, res) {
  res.render("index.ejs");
});

//Cuando se genera una conexión tomar el parametro de username y imprimirlo en el chat

io.sockets.on("connection", function(socket) {
  socket.on("username", function(username) {
    socket.username = username; //este parametro esta siendo pedido en el frontend
    io.emit("is_online", "🔵 <i>" + socket.username + " se une al chat..</i>");
  });


  // Si un usuario se desconecta, se emite un mensaje de abandono de chat

  socket.on("disconnect", function(username) {
    io.emit(
      "is_online",
      "🔴 <i>" + socket.username + " ha dejado el chat ..</i>"
    );
  });

// Este evento es ejecutado cuando un usuario oprime el boton enviar del frontend (del chat)

  socket.on("chat_message", function(message) {
    io.emit(
      "chat_message",
      "<strong>" + socket.username + "</strong>: " + message
    );
  });
});

//Conexion al servidor por el protocolo http

const server = http.listen(8080, function() {
  console.log("oyendo en *:8080");
});
