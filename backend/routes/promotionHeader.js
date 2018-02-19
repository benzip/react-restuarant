var express = require("express");
var router = express.Router();
// var db = require("../resource/db_instant").db;
var _ = require("lodash");
var db = require("diskdb");
var db_path = "db/collections";
var collections = require("../commons/collections");

const normalize = promotionHeader => {
  console.log(promotionHeader);
  promotionHeader.discount_value = parseFloat(promotionHeader.discount_value);
  promotionHeader.promotion_group = parseInt(promotionHeader.promotion_group);
  return promotionHeader;
};

router.post("/", function(req, res, next) {
  db.connect(db_path);
  let id = 1;
  let promotionHeaders = db.loadCollections([collections.promotions_header])[collections.promotions_header].find();
  let lastPrmotion;
  let insertPromotion;
  let obj = normalize(req.body);
  if (promotionHeaders.length > 0) {
    lastPrmotion = _.maxBy(promotionHeaders, function(o) {
      return o.id;
    });
    id = lastPrmotion.id + 1;
  }
  insertPromotion = {
    ...obj,
    id
  };
  db[collections.promotions_header].save(insertPromotion); // find with criteria not work
  return res.json({ status: "OK" });
});

router.put("/:id", function(req, res, next) {
  let obj = normalize(req.body);
  db.connect(db_path);
  db[collections.promotions_header].update({ id: req.params.id }, obj); // find with criteria not work
  return res.json({ status: "OK" });
});

router.get("/", function(req, res, next) {
  db.connect(db_path);
  let result = db.loadCollections([collections.promotions_header])[collections.promotions_header].find();
  return res.json(result);
});

router.get("/:id", function(req, res, next) {
  db.connect(db_path);
  let result = null;
  let filtered = null;
  let findResult = db.loadCollections([collections.promotions_header])[collections.promotions_header].find(); // find with criteria not work
  filtered = findResult.filter(item => item.id == req.params.id); //need to get all and workaround by filter
  if (filtered) {
    result = filtered[0];
  }
  return res.json(result);
});

router.delete("/:id", function(req, res, next) {
  db.connect(db_path, [collections.promotions_header]);
  db[collections.promotions_header].remove({ id: req.params.id }, true);
  db[collections.promotions_detail].remove({ header_id: req.params.id }, true);
  return res.json({ status: "OK", id: req.params.id });
});

module.exports = router;
