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
  SELECT   h.*,d.description detail_description 
    FROM promotions_header h JOIN promotions_detail d ON (h.id = d.header_id)
    WHERE     
    (   NULLIF($billValue,0) IS NULL OR    $billValue  >= d.billvalueFrom   )
    AND (  NULLIF($billValue,0)  IS NULL OR   $billValue <= d.billvalueTo )`;

  // AND ( NULLIF($promoCode,'') IS NULL OR   d.promo_code = $promoCode )
  // AND ( $numberOfSeat IS NULL OR d.number_of_seat = $numberOfSeat )

  db.all(
    sql,
    {
      $billValue: req.body.billValue || null
      // $promoCode: req.body.promoCode || null,
      // $numberOfSeat: req.body.numberOfSeat || null
    },
    function(err, rows) {
      if (err) {
        return res.json(err);
      }
      return res.json(rows);
    }
  );
});
module.exports = router;

//  knex.from('users').innerJoin('accounts', 'users.id', 'accounts.user_id')

// return knex({ h: "promotions_header", d: "promotions_detail" })
//   .innerJoin("promotions_detail", function() {
//     this.on("h.id", "=", "d.header_id");
//   })
//   .then(function(rows) {
//     res.status(200).json(rows);
//   })
//   .catch(function(error) {
//     next(error);
//   });
// .map(function(row) {
//   console.log(row);
// });
