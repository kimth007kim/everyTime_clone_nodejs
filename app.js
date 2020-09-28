const express = require("express");
var path = require("path");
const app = express();

const port = 3000;

app.use(express.static("images"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.get("/", (req, res) => {
  res.render("index", { title: "Index" });
});

app.listen(port, () => {
  console.log(`Example App Listening at http://localhost:${port}`);
});
