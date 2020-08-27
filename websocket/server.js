const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const MESSAGES = ["BE COOL", "BE BRAVE", "BE AWESOME"];

app.use(express.static(__dirname + "/"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  socket.on("getNotifications", () => {
    let counter = 0;
    const sendMessage = io.sockets.emit("message", MESSAGES[counter]);

    let messager = setInterval(() => {
      counter += 1;
      io.sockets.emit("message", MESSAGES[counter] || 'You`re waiting for too many compliments ;)' );
    }, 12000);

    // остановить вывод через 5 секунд
    setTimeout(() => {
      clearInterval(messager);
      io.sockets.emit("notificationsDone");
    }, 40000);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
