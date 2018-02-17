var express = require("express");
var router = express.Router();
// var db = require("../resource/db_instant").db;
var _ = require("lodash");
var db = require("diskdb");
var db_path = "db/collections";

const collectionName = "promotions_header";

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
  db.connect(update);
  db[collectionName].update({ id: req.params.id }, req.body); // find with criteria not work
  return res.json({ status: "OK" });
});

router.get("/", function(req, res, next) {
  db.connect(db_path);
  let result = db.loadCollections([collectionName])[collectionName].find();
  return res.json(result);
});

router.get("/:id", function(req, res, next) {
  db.connect(db_path);
  let result = null;
  let filtered = null;
  let findResult = db.loadCollections([collectionName])[collectionName].find(); // find with criteria not work
  filtered = findResult.filter(item => item.id == req.params.id); //need to get all and workaround by filter
  if (filtered) {
    result = filtered[0];
  }
  return res.json(result);
});

router.delete("/:id", function(req, res, next) {
  db.connect(db_path, [collectionName]);
  let result = db[collectionName].remove({ id: req.params.id }, true);
  return res.json({ status: "OK", ...result });
});

module.exports = router;
