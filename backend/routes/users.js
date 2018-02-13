var express = require("express");
var router = express.Router();
var db = require("../resource/db_instant").db;
/* GET users listing. */
router.get("/", function(req, res, next) {
  db.all(
    `select * from users where first_name like $filterText`,
    { $filterText: `%${req.query.filterText}%` },
    function(err, rows) {
      if (err) {
        return res.json(err);
      }
      return res.json(rows);
    }
  );
});

router.get("/:id", function(req, res, next) {
  db.get(`select * from users where id = ?`, [req.params.id], (err, row) => {
    return res.json(row);
  });
});

router.post("/", function(req, res, next) {
  db.run(
    `Insert into users (title,first_name,last_name,email,gender,department) values (?,?,?,?,?,?)`,

    [
      req.body.title,
      req.body.first_name,
      req.body.last_name,
      req.body.email,
      req.body.gender,
      req.body.department
    ],
    function(err) {
      if (err) return res.json(err);
      return res.json({
        userId: this.lastID
      });
    }
  );
});

router.put("/:id", function(req, res, next) {
  db.run(
    `Update users set 
      title = ?,
      first_name = ?,
      last_name = ?,
      email = ?,
      gender = ?,
      department = ?
      where id = ?;`,
    [
      req.body.title,
      req.body.first_name,
      req.body.last_name,
      req.body.email,
      req.body.gender,
      req.body.department,
      req.params.id
    ],
    function(err) {
      if (err) {
        return res.json(err);
      }
      return res.json({
        userId: req.params.id
      });
    }
  );
});

router.delete("/:id", function(req, res, next) {
  db.run(`delete from users where id = ?`, req.params.id, function(err, row) {
    if (err) {
      return res.json(err);
    }
    return res.json({
      deleted: this.changes
    });
  });
});

module.exports = router;
