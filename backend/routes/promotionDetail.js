var express = require("express");
var router = express.Router();
// var db = require("../resource/db_instant").db;
var _ = require("lodash");
var db = require("diskdb");
var db_path = "db/collections";

const collectionName = "promotions_detail";

const normalize = promotionDetail => {
  promotionDetail.bill_value_from = parseFloat(promotionDetail.bill_value_from) || null;
  promotionDetail.bill_value_to = parseFloat(promotionDetail.bill_value_to) || null;
  promotionDetail.promo_code = promotionDetail.promo_code || null;
  promotionDetail.number_of_seat = parseInt(promotionDetail.number_of_seat) || null;
  return promotionDetail;
};

router.post("/", function(req, res, next) {
  db.connect(db_path);
  let id = 1;
  let promotionHeaders = db.loadCollections([collectionName])[collectionName].find();
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
  db[collectionName].save(insertPromotion); // find with criteria not work
  return res.json({ status: "OK" });
});

router.put("/:id", function(req, res, next) {
  let options = {
    multi: false,
    upsert: false
  };
  let obj = normalize(req.body);
  db.connect(db_path, [collectionName]);
  let updated = db[collectionName].update({ id: req.params.id }, obj, options);
  return res.json({ status: "OK", ...updated });
});

router.delete("/:id", function(req, res, next) {
  db.connect(db_path, [collectionName]);
  let result = db[collectionName].remove({ id: req.params.id }, true);
  return res.json({ status: "OK", id: req.params.id });
});

router.get("/by-header/:headerId", function(req, res, next) {
  db.connect(db_path);
  let result = null;
  let findResult = db.loadCollections([collectionName])[collectionName].find(); // find with criteria not work
  result = findResult.filter(item => item.header_id == req.params.headerId); //need to get all and workaround by filter
  return res.json(result);
});

router.get("/:id", function(req, res, next) {
  db.connect(db_path);
  let result = null;
  let findResult = db.loadCollections([collectionName])[collectionName].find(); // find with criteria not work
  result = findResult.filter(item => item.id == req.params.id); //need to get all and workaround by filter
  if (result.length > 0) {
    result = result[0];
  }
  return res.json(result);
});

module.exports = router;
