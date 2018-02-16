var express = require("express");
var router = express.Router();
// var db = require("../resource/db_instant").db;
var db = require("diskdb");
var db_path = "db/collections";
const collections = {
  promotions_header: "promotions_header",
  promotions_detail: "promotions_detail"
};

router.get("/headers", function(req, res, next) {
  db.connect(db_path);
  let result = db.loadCollections([collections.promotions_header])[collections.promotions_header].find();
  return res.json(result);
});

router.get("/headers/:id", function(req, res, next) {
  db.connect(db_path);
  let result = db
    .loadCollections([collections.promotions_header])
    [collections.promotions_header].find({ id: req.params.id });
  console.log(req.params.id);
  return res.json(result);
});

router.post("/find", function(req, res, next) {
  db.connect(db_path);
  const { billValue, promotionCode, numberOfSeat } = req.body;
  let promotions_detail = db.loadCollections([collections.promotions_detail])[collections.promotions_detail].find();
  let promotions_header = null;
  let result = [];
  promotions_detail = promotions_detail.filter(row => {
    return (
      (row.bill_value_from === null || billValue >= row.bill_value_from) &&
      (row.bill_value_to === null || billValue <= row.bill_value_to) &&
      (row.promo_code === null || promotionCode === row.promo_code) &&
      (row.number_of_seat === null || numberOfSeat === row.number_of_seat)
    );
  });

  if (promotions_detail.length > 0) {
    result = promotions_detail.map(detail => {
      promotions_header = db
        .loadCollections([collections.promotions_header])
        [collections.promotions_header].find({ id: detail.header_id });
      if (promotions_header.length > 0) {
        return Object.assign(detail, {
          discount_value: promotions_header[0].discount_value,
          discount_type: promotions_header[0].discount_type,
          promotion_group: promotions_header[0].promotion_group
        });
      }
      return Object.assign(detail, { discount_value: null, discount_type: null, promotion_group: null }); //worst-case
    });
  }
  return res.json(result);
});

router.post("/apply", function(req, res, next) {
  let promotionsViewModel = req.body.promotions;
  let result = [];
  let promotionGroups = [];
  let maxGroupId = null;
  // console.log(promotionsViewModel);
  promotionsViewModel = promotionsViewModel.map(item => {
    if (item.promotion_group > maxGroupId || 0) {
      maxGroupId = item.promotion_group;
    }
    item.used = false;
    return item;
  }); // map
  console.log(maxGroupId);
  promotionsViewModel = promotionsViewModel.map(item => {
    if (item.promotion_group === maxGroupId) {
      item.used = true;
    }
    return item;
  });
  result = promotionsViewModel;
  return res.json(result);
});
module.exports = router;
