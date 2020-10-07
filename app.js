const express = require("express");
var path = require("path");
var mysql = require("mysql");
const { connect } = require("http2");
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
  // const sql = "Select * from free order by f_date desc;";
  // client.query(sql, (err, topics, fields) => {
  //   const id = req.params.id;
  // });
  client.connect();
  const sql = "select * from free";
  client.query(sql, (err, frees, fields) => {
    if (err) {
      console.log(err);
    } else {
      console.log("frees", frees);
      console.log("fields", fields);
    }
  });

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
