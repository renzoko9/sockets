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

  socket.on("event", (res) => {
    console.log(res)
    // Emite el mensaje a todos lo miembros de las sala menos a la persona que envia el mensaje
    socket.to(token).emit("event", res);
  });

  socket.on("disconnect", function () {
    console.log("user disconnected");
  });
});

server.listen(5000, function () {
  console.log("\n");
  console.log(`>> Socket listo y escuchando por el puerto: ${"5000"}`);
});
