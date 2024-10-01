const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

io.on("connection", function (socket) {
  const handshake = socket.id;

  let { nameRoom } = socket.handshake.query;
  console.log(
    `${chalk.green(
      `Nuevo dispositivo: ${handshake}`
    )} conectado a la ${nameRoom}`
  );
  socket.join(nameRoom);

  socket.on("evento", (res) => {
    // Emite el mensaje a todos lo miembros de las sala menos a la persona que envia el mensaje
    socket.to(nameRoom).emit("evento", res);
  });

  socket.on("disconnect", function () {
    console.log("user disconnected");
  });
});

server.listen(5000, function () {
  console.log("\n");
  console.log(
    `>> Socket listo y escuchando por el puerto: ${chalk.green("5000")}`
  );
});
