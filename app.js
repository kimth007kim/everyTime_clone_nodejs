const express = require("express");
var path = require("path");
var mysql = require("mysql");
const e = require("express");
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

// app.get("/", (req, res) => {
//   const sql = "Select * from free order by f_date DESC limit 4";
//   // const sql = "select * from free";
//   client.query(sql, (err, rows, fields) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.render('index',{rows:rows})
//       }
//     })
//   });

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

// 2번쨰 시도 multipleStatement true로 하고 한군데다가 다 쿼리문 쳐박기
// app.get("/", (req, res) => {

//   client.query( "Select * from free order by f_date DESC limit 4;Select * from secret order by s_date DESC limit 4;Select * from grad order by g_date DESC limit 4;Select * from market order by m_date DESC limit 4;Select * from new order by n_date DESC limit 4;Select * from info order by i_date DESC limit 4;Select * from prom order by p_date DESC limit 4;Select * from team order by t_date DESC limit 4", (err, frees, fields) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.render('index',{frees:frees})
//       }
//     })
//   });

// 1번째 시도 그냥 원시적으로 해본것
// app.get("/", (req, res) => {
//   const sql1 = "Select * from free order by f_date DESC limit 4";
//   const sql2 = "Select * from secret order by s_date DESC limit 4";
//   const sql3 = "Select * from grad order by g_date DESC limit 4";
//   const sql4 = "Select * from market order by m_date DESC limit 4";
//   const sql5 = "Select * from new order by n_date DESC limit 4";
//   const sql6 = "Select * from info order by i_date DESC limit 4";
//   const sql7 = "Select * from prom order by p_date DESC limit 4";
//   const sql8 = "Select * from team order by t_date DESC limit 4";
//   client.query(sql1, (err, frees, fields) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.render('index',{frees:frees})
//       }
//     })
//     client.query(sql2, (err, secrets, fields) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.render('index',{secrets:secrets})
//         }
//       })
//     client.query(sql3, (err, grads, fields) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.render('index',{grads:grads})
//         }
//       })
//     client.query(sql4, (err, markets, fields) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.render('index',{markets:markets})
//         }
//       })
//     client.query(sql5, (err, news, fields) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.render('index',{news:news})
//         }
//       })
//     client.query(sql6, (err, infos, fields) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.render('index',{infos:infos})
//         }
//       })
//     client.query(sql7, (err, proms, fields) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.render('index',{proms:proms})
//         }
//       })
//     client.query(sql8, (err, teams, fields) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.render('index',{teams:teams})
//         }
// })
// });

app.get("/login", (req, res) => {
  res.render("login", { title: "login" });
});
app.get("/register", (req, res) => {
  res.render("register");
});

app.listen(port, () => {
  console.log(`Example App Listening at http://localhost:${port}`);
});
