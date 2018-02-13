var express = require("express");
var router = express.Router();
var db = require("../resource/db_instant").db;

router.get("/", function(req, res, next) {
  db.all(`select * from promotions_header`, function(err, rows) {
    if (err) {
      return res.json(err);
    }
    return res.json(rows);
  });
});

module.exports = router;
