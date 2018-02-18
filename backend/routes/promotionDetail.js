var express = require("express");
var router = express.Router();
// var db = require("../resource/db_instant").db;
var _ = require("lodash");
var db = require("diskdb");
var db_path = "db/collections";

const collectionName = "promotions_detail";

router.post("/", function(req, res, next) {
  db.connect(db_path);
  let id = 1;
  let promotionHeaders = db.loadCollections([collectionName])[collectionName].find();
  let lastPrmotion;
  let insertPromotion;
  if (promotionHeaders.length > 0) {
    lastPrmotion = _.maxBy(promotionHeaders, function(o) {
      return o.id;
    });
    id = lastPrmotion.id + 1;
  }
  insertPromotion = {
    ...req.body,
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
  db.connect(db_path, [collectionName]);
  let obj = { ...req.body };
  obj.bill_value_from = obj.bill_value_from || null;
  obj.bill_value_to = obj.bill_value_to || null;
  obj.promo_code = obj.promo_code || null;
  obj.number_of_seat = obj.number_of_seat || null;

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
