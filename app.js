const express = require("express");
var path = require("path");
var mysql = require("mysql");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var client = mysql.createConnection({
  user: "root",
  password: "1234",
  database: "every_time",
  multipleStatements: true,
});

client.connect();

const app = express();

const port = 3000;

app.use(express.static("images"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 3번째 시도  두번째 쿼리를 콜백 함수 안에다가 집어넣기

app.get("/", (req, res) => {
  const sql1 = "Select * from free order by f_date DESC limit 4";
  const sql2 = "Select * from secret order by s_date DESC limit 4";
  const sql3 = "Select * from grad order by g_date DESC limit 4";
  const sql4 = "Select * from market order by m_date DESC limit 4";
  const sql5 = "Select * from new order by n_date DESC limit 4";
  const sql6 = "Select * from info order by i_date DESC limit 4";
  const sql7 = "Select * from prom order by p_date DESC limit 4";
  const sql8 = "Select * from team order by t_date DESC limit 4";
  client.query(sql1, (err, frees, fields) => {
    if (err) {
      console.log(err);
    } else {
      client.query(sql2, (err, secrets, fields) => {
        if (err) {
          console.log(err);
        } else {
          client.query(sql3, (err, grads, fields) => {
            if (err) {
              console.log(err);
            } else {
              client.query(sql4, (err, markets, fields) => {
                if (err) {
                  console.log(err);
                } else {
                  client.query(sql5, (err, news, fields) => {
                    if (err) {
                      console.log(err);
                    } else {
                      client.query(sql6, (err, infos, fields) => {
                        if (err) {
                          console.log(err);
                        } else {
                          client.query(sql7, (err, proms, fields) => {
                            if (err) {
                              console.log(err);
                            } else {
                              client.query(sql8, (err, teams, fields) => {
                                if (err) {
                                  console.log(err);
                                } else {
                                  res.render("index", {
                                    frees: frees,
                                    secrets: secrets,
                                    grads: grads,
                                    markets: markets,
                                    news: news,
                                    infos: infos,
                                    proms: proms,
                                    teams: teams,
                                  });
                                }
                              });
                            }
                          });
                        }
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  });
});

app.get("/free", (req, res) => {
  res.render("free", { title: "free" });
});

app.get("/login", (req, res) => {
  res.render("login");
});
app.post("/login", (req, res) => {
  var id = req.body.userid;
  var pw = req.body.password;
  var sql = "Select * from user where id=?";
  client.query(sql, [id], (err, results, fields) => {
    if (err) {
      console.log("에러발생", err);
      res.send({
        code: 400,
        failed: "error ocurred",
      });
    } else {
      if (results.length > 0) {
        if (results[0].password == pw) {
          res.send({
            code: 200,
            success: "login sucessfull",
          });
        } else {
          res.send({
            code: 204,
            sucess: "아이디와 비번 불일치",
          });
        }
      } else {
        res.send({
          code: 204,
          success: "Email does not exists",
        });
      }
    }
  });
  console.log(id);
  console.log(pw);
});
app.get("/register", (req, res) => {
  res.render("register");
});

app.listen(port, () => {
  console.log(`Example App Listening at http://localhost:${port}`);
});
