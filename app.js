const express = require("express");
var path = require("path");
var mysql = require("mysql");
var client = mysql.createConnection({
  user: "root",
  password: "1234",
  database: "every_time",
});
const app = express();

const port = 3000;

app.use(express.static("images"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.get("/", (req, res) => {
  res.render("index", { title: "Index" });
});
app.get("/login", (req, res) => {
  res.render("login", { title: "login" });
});
app.get("/register", (req, res) => {
  res.render("register");
});

app.listen(port, () => {
  console.log(`Example App Listening at http://localhost:${port}`);
});
