const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const port = 3000;

server.listen(port, () => {
  console.log(`server running at port ${port}`);
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
app.get("/javascript", (req, res) => {
    res.sendFile(__dirname + "/public/javascript.html");
  });

  app.get("/android", (req, res) => {
    res.sendFile(__dirname + "/public/android.html");
  });
  app.get("/node", (req, res) => {
    res.sendFile(__dirname + "/public/node.html");
  });
  app.get("/mysql", (req, res) => {
    res.sendFile(__dirname + "/public/mysql.html");
  });
//create a namespace tech for chat room of tech
const tech = io.of("/tech");
tech.on("connection", socket => {
  console.log("user connected");
  socket.on("message", data => {
    console.log(`message : ${data.msg}`);
    tech.in(data.room).emit("message", data.msg);
  });
  socket.on("disconnect", () => {
    console.log("disconnected");
    tech.emit("message", "user disconnected");
  });

  socket.on("join", data => {
    socket.join(data.room);
    tech.in(data.room).emit("message", `new user joined ${data.room} room !!!`);
  });
});
