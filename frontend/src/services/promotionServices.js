import { callApi } from "./api";
import { API_ENTRY_POINT } from "../commons/consts/api_resources/api_endpoints";
export const getPromotions = ({ filterText }) => {
  return callApi({
    method: "get",
    url: `${API_ENTRY_POINT}/promotions`
  });
};

export const findPromotions = params => {
  return callApi({
    method: "post",
    url: `${API_ENTRY_POINT}/promotions/find`,
    data: params
  });
};

export const applyPromotions = params => {
  return callApi({
    method: "post",
    url: `${API_ENTRY_POINT}/promotions/apply`,
    data: { promotions: params.promotions }
  });
};

export const findAndApplyPromotions = ({ promotions, billValue, promotionCode, numberOfSeat }) => {
  return callApi({
    method: "post",
    url: `${API_ENTRY_POINT}/promotions/findAndApply`,
    data: { billValue, promotionCode, numberOfSeat, promotions }
  });
};
