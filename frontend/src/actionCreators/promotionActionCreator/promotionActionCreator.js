import * as ActionTypes from "../../actiontypes/promotionActionTypes";
import _ from "lodash";
import axios from "axios";
import { API_ENTRY_POINT } from "../../commons/consts/api_resources/api_endpoints";

const discountTypes = _.mapKeys(
  [
    {
      id: 1,
      discountType: "PERCENT"
    },
    {
      id: 2,
      discountType: "FIXED"
    }
  ],
  "id"
);

const promotions = [
  {
    id: 1,
    discountValue: 15,
    discountType: discountTypes[1],
    billingValue: 1000,
    promoCode: "LUCKY ONE",
    description: `Discount 15% for coupon code "LUCK ONE" or the bill is more than 1000 Bath`
  },
  {
    id: 2,
    discountValue: 25,
    discountType: discountTypes[1],
    billvalueFrom: null,
    billvalueTo: null,
    promoCode: "4PAY3",
    description: `Come 4 pay 3 4PAY3`
  },
  {
    id: 3,
    discountValue: 20,
    discountType: discountTypes[1],
    billvalueFrom: null,
    billvalueTo: null,
    promoCode: "LUCKY TWO",
    description: `Discount 20% for 2 customer when they present a coupon code as "LUCKY TWO"`
  },
  {
    id: 4,
    discountValue: 25,
    discountType: discountTypes[1],
    billvalueFrom: null,
    billvalueTo: null,
    billValue: 6000,
    promoCode: "",
    description: `Discount 25% when the bill is over 6000 Bath but it exclude all promotion"`
  },
  {
    id: 1,
    discountValue: 15,
    discountType: discountTypes[1],
    billingValue: 1000,
    promoCode: "LUCKY ONE",
    description: `Discount 15% for coupon code "LUCK ONE" or the bill is more than 1000 Bath`
  },
  {
    id: 2,
    discountValue: 25,
    discountType: discountTypes[1],
    billvalueFrom: 1001,
    billvalueTo: null,
    promoCode: "4PAY3",
    description: `Come 4 pay 3 4PAY3`
  },
  {
    id: 3,
    discountValue: 20,
    discountType: discountTypes[1],
    billvalueFrom: null,
    billvalueTo: null,
    promoCode: "LUCKY TWO",
    description: `Discount 20% for 2 customer when they present a coupon code as "LUCKY TWO"`
  },
  {
    id: 4,
    discountValue: 25,
    discountType: discountTypes[1],
    billvalueFrom: null,
    billvalueTo: null,
    billValue: 6000,
    promoCode: "",
    description: `Discount 25% when the bill is over 6000 Bath but it exclude all promotion"`
  },
  {
    id: 1,
    discountValue: 15,
    discountType: discountTypes[1],
    billingValue: 1000,
    promoCode: "LUCKY ONE",
    description: `Discount 15% for coupon code "LUCK ONE" or the bill is more than 1000 Bath`
  },
  {
    id: 2,
    discountValue: 25,
    discountType: discountTypes[1],
    billvalueFrom: 1001,
    billvalueTo: null,
    promoCode: "4PAY3",
    description: `Come 4 pay 3 4PAY3`
  },
  {
    id: 3,
    discountValue: 20,
    discountType: discountTypes[1],
    billvalueFrom: null,
    billvalueTo: null,
    promoCode: "LUCKY TWO",
    description: `Discount 20% for 2 customer when they present a coupon code as "LUCKY TWO"`
  },
  {
    id: 4,
    discountValue: 25,
    discountType: discountTypes[1],
    billvalueFrom: null,
    billvalueTo: null,
    billValue: 6000,
    promoCode: "",
    description: `Discount 25% when the bill is over 6000 Bath but it exclude all promotion"`
  },
  {
    id: 1,
    discountValue: 15,
    discountType: discountTypes[1],
    billingValue: 1000,
    promoCode: "LUCKY ONE",
    description: `Discount 15% for coupon code "LUCK ONE" or the bill is more than 1000 Bath`
  },
  {
    id: 2,
    discountValue: 25,
    discountType: discountTypes[1],
    billvalueFrom: 1001,
    billvalueTo: null,
    promoCode: "4PAY3",
    description: `Come 4 pay 3 4PAY3`
  },
  {
    id: 3,
    discountValue: 20,
    discountType: discountTypes[1],
    billvalueFrom: null,
    billvalueTo: null,
    promoCode: "LUCKY TWO",
    description: `Discount 20% for 2 customer when they present a coupon code as "LUCKY TWO"`
  },
  {
    id: 4,
    discountValue: 25,
    discountType: discountTypes[1],
    billvalueFrom: null,
    billvalueTo: null,
    billValue: 6000,
    promoCode: "",
    description: `Discount 25% when the bill is over 6000 Bath but it exclude all promotion"`
  },
  {
    id: 1,
    discountValue: 15,
    discountType: discountTypes[1],
    billingValue: 1000,
    promoCode: "LUCKY ONE",
    description: `Discount 15% for coupon code "LUCK ONE" or the bill is more than 1000 Bath`
  },
  {
    id: 2,
    discountValue: 25,
    discountType: discountTypes[1],
    billvalueFrom: 1001,
    billvalueTo: null,
    promoCode: "4PAY3",
    description: `Come 4 pay 3 4PAY3`
  },
  {
    id: 3,
    discountValue: 20,
    discountType: discountTypes[1],
    billvalueFrom: null,
    billvalueTo: null,
    promoCode: "LUCKY TWO",
    description: `Discount 20% for 2 customer when they present a coupon code as "LUCKY TWO"`
  },
  {
    id: 4,
    discountValue: 25,
    discountType: discountTypes[1],
    billvalueFrom: null,
    billvalueTo: null,
    billValue: 6000,
    promoCode: "",
    description: `Discount 25% when the bill is over 6000 Bath but it exclude all promotion"`
  }
];

export function getPromotions() {
  var request = axios({
    method: "get",
    url: `http://localhost:3000/api/promotions`
  });

  return {
    type: ActionTypes.GET_PROMOTIONS,
    payload: request
  };
}

export function findPromotions(params) {
  console.log("params", params);
  var request = axios({
    method: "post",
    url: `http://localhost:3000/api/promotions/find`,
    data: {
      billValue: params.billValue,
      promotionCode: params.promotionCode,
      numberOfSeat: params.numberOfSeat
    }
  });

  return {
    type: ActionTypes.FIND_PROMOTIONS,
    payload: request
  };
}
