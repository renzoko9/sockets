const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const options = {
  cors: {
    origin: "http://localhost:7272",
  },
};
const server = require("http").Server(app);
const io = require("socket.io")(server, options);

io.on("connection", function (socket) {
  const handshake = socket.id;
  let { token } = socket.handshake.query;
  socket.join(token);
  console.log(`Nuevo dispositivo: ${handshake}, se ha unido a ${token}`);

  // Escuchar eventos de tipo "mensaje"
  socket.on("mensaje", (data) => {
    console.log(`Mensaje recibido en la sala ${token}:`, data);
    
    // Emite el mensaje a todos los miembros de la sala menos al remitente
    socket.to(token).emit("mensaje", data);
  });

  // Escuchar eventos de tipo "puntos"
  socket.on("puntos", (data) => {
    console.log(`Puntos recibidos en la sala ${token}:`, data);

    // Emite los puntos a todos los miembros de la sala menos al remitente
    socket.to(token).emit("puntos", data);
  });

  socket.on("disconnect", function () {
    console.log("user disconnected");
  });
});

server.listen(5000, function () {
  console.log("\n");
  console.log(`>> Socket listo y escuchando por el puerto: ${"5000"}`);
});
