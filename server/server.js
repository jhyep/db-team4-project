const express = require("express");
const app = express();
const path = require("path");
const port = 8080;

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const cors = require("cors");
app.use(express.json());
app.use(cors());

const bookRoutes = require("./routes/book.js");
const userRoutes = require("./routes/user.js");

app.use(express.static(path.join(__dirname, "../client")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

app.use("/user", userRoutes);
app.use("/book", bookRoutes);

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

app.listen(port, function () {
  console.log(`listening on ${port}`);
});
