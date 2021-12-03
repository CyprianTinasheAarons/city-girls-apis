const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./models");
let app = require("express")();
let port = process.env.PORT || 8090;
let http = require("http").Server(app);
let io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Afroshelter api." });
});

require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
require("./routes/categories.routes")(app);

http.listen(port, () => {
  console.log(`Server is  running on port ${port}`);
});

io.on("connection", function (socket) {
  console.log("A new user connected to the socket server!", socket.id);

  socket.emit("connections", io.sockets.sockets.length);

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });

  socket.on("chat-message", (data) => {
    socket.broadcast.emit("chat-message", data);
  });

  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  });

  socket.on("stopTyping", () => {
    socket.broadcast.emit("stopTyping");
  });

  socket.on("joined", (data) => {
    socket.broadcast.emit("joined", data);
  });

  socket.on("leave", (data) => {
    socket.broadcast.emit("leave", data);
  });
});
