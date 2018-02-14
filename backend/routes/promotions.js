var express = require("express");
var router = express.Router();
var db = require("../resource/db_instant").db;
var knex = require("../resource/db_instant").knex_instant;
router.get("/", function(req, res, next) {
  db.all(`select * from promotions_header`, function(err, rows) {
    if (err) {
      return res.json(err);
    }
    return res.json(rows);
  });
});

router.post("/find", function(req, res, next) {
  let sql = `
  SELECT * , d.header_id
    FROM promotions_header h
        JOIN promotions_detail d ON (h.id = d.header_id)
    WHERE (
        d.billValueFrom IS NULL
        OR 789 >= d.billvalueFrom
        )
        AND (
        d.billValueTo IS NULL
        OR 789 <= d.billvalueTo
        )
        AND (
        d.promo_code IS NULL
        OR d.promo_code = 'LUCKY ONE'
        )
        AND (
        d.number_of_seat IS NULL
        OR d.number_of_seat = 2
        )
 `;
  return res.json({ sql: knex.select().table("promotions_header") });
  db.all(sql, function(err, rows) {
    if (err) {
      return res.json(err);
    }
    return res.json(rows);
  });
});
module.exports = router;
