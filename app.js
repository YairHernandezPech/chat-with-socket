const express = require("express");
const http = require("http");
var cors = require("cors");

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
const { Server } = require("socket.io");
const io = new Server(server);

app.use("/", express.static("public"));
app.use(cors());

io.on("connection", (socket) => {
  socket.on("chat", (msj) => {
    io.emit("chat", msj);
  });
  console.log("Un usuario se ha conectado");
});

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

server.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
