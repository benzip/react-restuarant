var express = require("express");
var router = express.Router();
var db = require("../resource/db_instant").db;

router.get("/title", function(req, res, next) {
  db.all(
    "select key2,desc from key_value_setup where `key1` = 'user_title'",
    function(err, rows) {
      if (err) {
        return res.json(err);
      }
      return res.json(rows);
    }
  );
});

router.get("/gender", function(req, res, next) {
  db.all(
    "select key2,desc from key_value_setup where `key1` = 'user_gender'",
    function(err, rows) {
      if (err) {
        return res.json(err);
      }
      return res.json(rows);
    }
  );
});

router.get("/department", function(req, res, next) {
  db.all("select * from departments", function(err, rows) {
    if (err) {
      return res.json(err);
    }
    return res.json(rows);
  });
});

module.exports = router;
