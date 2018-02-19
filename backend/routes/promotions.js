var express = require("express");
var router = express.Router();
// var db = require("../resource/db_instant").db;
var _ = require("lodash");
var db = require("diskdb");
var db_path = "db/collections";

const collections = {
  promotions_header: "promotions_header",
  promotions_detail: "promotions_detail"
};

const applyPromotion = promotions => {
  let promotionsViewModel = promotions;
  let result = [];
  let usedHeaderIds = [];
  let maxGroupId = null;
  // console.log(promotionsViewModel);
  promotionsViewModel = promotionsViewModel.map(item => {
    if (item.promotion_group > maxGroupId || 0) {
      maxGroupId = item.promotion_group;
    }
    item.used = false;
    return item;
  }); // find max group id

  promotionsViewModel = promotionsViewModel.map(item => {
    if (item.promotion_group === maxGroupId) {
      item.used = true;
    }
    return item;
  }); // used max group id

  promotionsViewModel = _.orderBy(promotionsViewModel, ["header_id", "id"], ["asc", "asc"]).map(item => {
    if (item.used) {
      if (usedHeaderIds.filter(usedHeaderId => usedHeaderId === item.header_id).length === 0) {
        usedHeaderIds.push(item.header_id);
      } else {
        item.used = false;
      }
    }
    return item;
  }); // use once if same header id

  result = promotionsViewModel;
  return result;
};

const findPromotions = ({ billValue, promotionCode, numberOfSeat }) => {
  db.connect(db_path);
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
      promotions_header = db.loadCollections([collections.promotions_header])[collections.promotions_header].find({ id: detail.header_id });
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
  return result;
};

const calculate = (unitPrice, billValue, promotions) => {
  let dicountValue = 0;
  let discountPartitioning = {};
  let result = {
    discount: 0,
    totalAmount: billValue,
    netAmount: 0
  };
  let tmpResult = {
    discount: 0,
    totalAmount: billValue,
    netAmount: 0
  };
  let tmpDiscount = 0;
  let tmpTotalAmount = billValue;

  if (promotions.length > 0) {
    /* calculated fixed value discount */
    _.forOwn(
      _.groupBy(promotions.filter(item => item.discount_type != "PERCENT"), "discount_type"),
      /* FIXED : {...}, FIXED_UNIT_PRICE : {...} */ (promotios, key) => {
        let sumDiscount = _.sumBy(promotios, o => o.discount_value);
        switch (key) {
          case "FIXED":
            tmpDiscount += parseFloat(sumDiscount);
            break;
          case "FIXED_UNIT_PRICE":
            tmpDiscount += parseFloat(sumDiscount) * parseFloat(unitPrice);
            break;
        }
      }
    );
    console.log("tmpDiscount", tmpDiscount);
    tmpResult = getCalcResult(tmpTotalAmount, tmpDiscount);
    dicountValue += tmpDiscount;
    /* calculated fixed value discount */

    /* calculated percent value discount on last net amount*/
    console.log("tmpResult", tmpResult);
    tmpDiscount = 0;
    promotions.filter(item => item.discount_type == "PERCENT").map(item => {
      tmpTotalAmount = tmpResult.netAmount;
      tmpDiscount = tmpTotalAmount * (item.discount_value / 100);
      tmpResult = getCalcResult(tmpTotalAmount, tmpDiscount);
      dicountValue += tmpResult.discount;
    });
  }

  return {
    discount: dicountValue,
    totalAmount: billValue,
    netAmount: tmpResult.netAmount
  };
};

const getCalcResult = (totalAmount, discount) => {
  totalAmount = parseFloat(totalAmount.toFixed(2));
  discount = parseFloat(discount.toFixed(2));
  console.log("discount", discount);
  return {
    totalAmount,
    discount,
    netAmount: totalAmount - discount
  };
};

router.post("/findAndApply", function(req, res, next) {
  let promotions = [];
  let findResult = findPromotions(req.body);
  let appliedPromotions = [];
  let result = {};
  if (findResult.length && findResult.length > 0) {
    promotions = promotions.concat(findResult);
  }

  if (req.body.promotions && req.body.promotions.length > 0) {
    promotions = promotions.concat(req.body.promotions);
  }
  appliedPromotions = applyPromotion(promotions);
  result = {
    appliedPromotions: _.uniqBy(appliedPromotions, "id"),
    calculateResult: calculate(req.body.unitPrice, req.body.billValue, appliedPromotions.filter(item => item.used))
  };
  return res.json(result);
});

module.exports = router;
