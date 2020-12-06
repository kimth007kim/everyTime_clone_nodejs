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
