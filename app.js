const express = require("express");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
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
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: new FileStore(),
  })
);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 3번째 시도  두번째 쿼리를 콜백 함수 안에다가 집어넣기

let user = {
  uer_id: "kkd",
  user_pwd: "1234",
};

app.get("/", (req, res) => {
  console.log(req.session);

  if (!req.session.num) {
    req.session.num = 1;
  } else {
    req.session.num = req.session.num + 1;
  }

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
  // res.send(`Number:${req.session.num}`);
});

// READ 기능 (리스트)

app.get("/free", (req, res) => {
  const sql = "Select * from free order by f_date DESC limit 8";
  client.query(sql, (err, frees, fields) => {
    if (err) {
      console.log(err);
    } else {
      res.render("listArticle/freelist", { title: "자유게시판", frees: frees });
    }
  });
});
app.get("/secret", (req, res) => {
  const sql = "Select * from secret order by s_date DESC limit 8";
  client.query(sql, (err, secrets, fields) => {
    if (err) {
      console.log(err);
    } else {
      res.render("listArticle/secretlist", {
        title: "비밀게시판",
        secrets: secrets,
      });
    }
  });
});
app.get("/grad", (req, res) => {
  const sql = "Select * from grad order by g_date DESC limit 8";
  client.query(sql, (err, grads, fields) => {
    if (err) {
      console.log(err);
    } else {
      res.render("listArticle/gradlist", {
        title: "졸업게시판",
        grads: grads,
      });
    }
  });
});
app.get("/market", (req, res) => {
  const sql = "Select * from market order by m_date DESC limit 8";
  client.query(sql, (err, markets, fields) => {
    if (err) {
      console.log(err);
    } else {
      res.render("listArticle/marketlist", {
        title: "장터",
        markets: markets,
      });
    }
  });
});
app.get("/new", (req, res) => {
  const sql = "Select * from new order by n_date DESC limit 8";
  client.query(sql, (err, news, fields) => {
    if (err) {
      console.log(err);
    } else {
      res.render("listArticle/newlist", {
        title: "새내기게시판",
        news: news,
      });
    }
  });
});
app.get("/info", (req, res) => {
  const sql = "Select * from info order by i_date DESC limit 8";
  client.query(sql, (err, infos, fields) => {
    if (err) {
      console.log(err);
    } else {
      res.render("listArticle/infolist", {
        title: "정보게시판",
        infos: infos,
      });
    }
  });
});
app.get("/prom", (req, res) => {
  const sql = "Select * from prom order by p_date DESC limit 8";
  client.query(sql, (err, proms, fields) => {
    if (err) {
      console.log(err);
    } else {
      res.render("listArticle/promlist", {
        title: "홍보게시판",
        proms: proms,
      });
    }
  });
});
app.get("/team", (req, res) => {
  const sql = "Select * from team order by t_date DESC limit 8";
  client.query(sql, (err, teams, fields) => {
    if (err) {
      console.log(err);
    } else {
      res.render("listArticle/teamlist", {
        title: "동아리게시판",
        teams: teams,
      });
    }
  });
});

// READ 기능 (리스트)

// READ 기능 (특정글)

app.get("/free/:id", (req, res) => {
  const sql = "Select * from free where f_num=?";
  client.query(sql, [req.params.id], (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else {
      res.render("showArticle/freeshow", {
        row: rows[0],
      });
      console.log(rows[0]);
    }
  });
});
app.get("/secret/:id", (req, res) => {
  const sql = "Select * from secret where s_num=?";
  client.query(sql, [req.params.id], (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else {
      res.render("showArticle/secretshow", {
        row: rows[0],
      });
      console.log(rows[0]);
    }
  });
});
app.get("/grad/:id", (req, res) => {
  const sql = "Select * from grad where g_num=?";
  client.query(sql, [req.params.id], (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else {
      res.render("showArticle/gradshow", {
        row: rows[0],
      });
      console.log(rows[0]);
    }
  });
});
app.get("/market/:id", (req, res) => {
  const sql = "Select * from market where m_num=?";
  client.query(sql, [req.params.id], (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else {
      res.render("showArticle/marketshow", {
        row: rows[0],
      });
      console.log(rows[0]);
    }
  });
});
app.get("/new/:id", (req, res) => {
  const sql = "Select * from new where n_num=?";
  client.query(sql, [req.params.id], (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else {
      res.render("showArticle/newshow", {
        row: rows[0],
      });
      console.log(rows[0]);
    }
  });
});
app.get("/info/:id", (req, res) => {
  const sql = "Select * from info where i_num=?";
  client.query(sql, [req.params.id], (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else {
      res.render("showArticle/infoshow", {
        row: rows[0],
      });
      console.log(rows[0]);
    }
  });
});
app.get("/prom/:id", (req, res) => {
  const sql = "Select * from prom where p_num=?";
  client.query(sql, [req.params.id], (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else {
      res.render("showArticle/promshow", {
        row: rows[0],
      });
      console.log(rows[0]);
    }
  });
});
app.get("/team/:id", (req, res) => {
  const sql = "Select * from team where t_num=?";
  client.query(sql, [req.params.id], (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else {
      res.render("showArticle/teamshow", {
        row: rows[0],
      });
      console.log(rows[0]);
    }
  });
});

// READ 기능 (특정글)

// CREATE 기능

app.get("/writefree", (req, res) => {
  res.render("writeArticle/freewrite");
});
app.post("/writefree", (req, res) => {
  var body = req.body;
  var sql = "Insert into free (id,f_title,f_txt) VALUES (?,?,?) ";
  var params = ["익명", body.title, body.text];
  client.query(sql, params, function (err, rows, fields) {
    if (err) {
      console.log(err);
    } else {
      console.log(rows.insertId);
      res.redirect("/free");
    }
  });
});

app.get("/writesecret", (req, res) => {
  res.render("writeArticle/secretwrite");
});
app.post("/writesecret", (req, res) => {
  var body = req.body;
  var sql = "Insert into secret (id,s_title,s_txt) VALUES (?,?,?) ";
  var params = ["익명", body.title, body.text];
  client.query(sql, params, function (err, rows, fields) {
    if (err) {
      console.log(err);
    } else {
      console.log(rows.insertId);
      res.redirect("/secret");
    }
  });
});

app.get("/writegrad", (req, res) => {
  res.render("writeArticle/gradwrite");
});
app.post("/writegrad", (req, res) => {
  var body = req.body;
  var sql = "Insert into grad (id,g_title,g_txt) VALUES (?,?,?) ";
  var params = ["익명", body.title, body.text];
  client.query(sql, params, function (err, rows, fields) {
    if (err) {
      console.log(err);
    } else {
      console.log(rows.insertId);
      res.redirect("/grad");
    }
  });
});

app.get("/writemarket", (req, res) => {
  res.render("writeArticle/marketwrite");
});
app.post("/writemarket", (req, res) => {
  var body = req.body;
  var sql = "Insert into market (id,m_title,m_txt) VALUES (?,?,?) ";
  var params = ["익명", body.title, body.text];
  client.query(sql, params, function (err, rows, fields) {
    if (err) {
      console.log(err);
    } else {
      console.log(rows.insertId);
      res.redirect("/market");
    }
  });
});

app.get("/writenew", (req, res) => {
  res.render("writeArticle/newwrite");
});
app.post("/writenew", (req, res) => {
  var body = req.body;
  var sql = "Insert into new (id,n_title,n_txt) VALUES (?,?,?) ";
  var params = ["익명", body.title, body.text];
  client.query(sql, params, function (err, rows, fields) {
    if (err) {
      console.log(err);
    } else {
      console.log(rows.insertId);
      res.redirect("/new");
    }
  });
});

app.get("/writeinfo", (req, res) => {
  res.render("writeArticle/infowrite");
});
app.post("/writeinfo", (req, res) => {
  var body = req.body;
  var sql = "Insert into info (id,i_title,i_txt) VALUES (?,?,?) ";
  var params = ["익명", body.title, body.text];
  client.query(sql, params, function (err, rows, fields) {
    if (err) {
      console.log(err);
    } else {
      console.log(rows.insertId);
      res.redirect("/info");
    }
  });
});

app.get("/writeteam", (req, res) => {
  res.render("writeArticle/teamwrite");
});
app.post("/writeteam", (req, res) => {
  var body = req.body;
  var sql = "Insert into team (id,t_title,t_txt) VALUES (?,?,?) ";
  var params = ["익명", body.title, body.text];
  client.query(sql, params, function (err, rows, fields) {
    if (err) {
      console.log(err);
    } else {
      console.log(rows.insertId);
      res.redirect("/team");
    }
  });
});

app.get("/writeprom", (req, res) => {
  res.render("writeArticle/promwrite");
});
app.post("/writeprom", (req, res) => {
  var body = req.body;
  var sql = "Insert into prom (id,p_title,p_txt) VALUES (?,?,?) ";
  var params = ["익명", body.title, body.text];
  client.query(sql, params, function (err, rows, fields) {
    if (err) {
      console.log(err);
    } else {
      console.log(rows.insertId);
      res.redirect("/prom");
    }
  });
});
// CREATE 기능

// 로그인 기능
app.get("/login", (req, res) => {
  if (req.session.logined) {
    res.render("index", { id: req.session.userid });
  } else {
    res.render("login", { pass: "tr" });
  }
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
          req.session.logined = true;
          req.session.userid = id;
          console.log(req.session.logined);
          console.log("로그인 성공");

          res.redirect("/");
          // res.redirect("/", { pass: "logined" });
          // res.render("index", { pass: "logined" });
        } else {
          console.log("false1");
          res.render("login", { pass: "false1" });
          // res.redirect("/");
        }
      } else {
        // alert("아이디가 존재 하지 않습니다.")
        console.log("false2");
        res.render("login", { pass: "false2" });
      }
    }
  });
  console.log(id);
  console.log(pw);
});
app.post("logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});
app.get("/register", (req, res) => {
  res.render("register");
});
// 로그인 기능

app.listen(port, () => {
  console.log(`Example App Listening at http://localhost:${port}`);
});
