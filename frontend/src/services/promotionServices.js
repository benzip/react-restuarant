import { callApi } from "./api";
import { API_ENTRY_POINT } from "../commons/consts/api_resources/api_endpoints";
export const getPromotionHeaders = () => {
  return callApi({
    method: "get",
    url: `${API_ENTRY_POINT}/promotions/headers`
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

export const getPromotionHeader = ({ id }) => {
  return callApi({
    method: "get",
    url: `${API_ENTRY_POINT}/promotion-header/${id}`
  });
};
export const getPromotionDetails = ({ headerId }) => {
  return callApi({
    method: "get",
    url: `${API_ENTRY_POINT}/promotion-detail/by-header/${headerId}`
  });
};

export const getPromotionDetail = ({ id }) => {
  return callApi({
    method: "get",
    url: `${API_ENTRY_POINT}/promotion-detail/${id}`
  });
};

export const savePromotionHeader = ({ id, promotionHeader }) => {
  if (id) {
    return callApi({
      method: "put",
      url: `${API_ENTRY_POINT}/promotion-header/${id}`,
      data: promotionHeader
    });
  } else {
    return callApi({
      method: "post",
      url: `${API_ENTRY_POINT}/promotion-header`,
      data: promotionHeader
    });
  }
};

export const savePromotionDetail = ({ id, promotionDetail }) => {
  if (id) {
    return callApi({
      method: "put",
      url: `${API_ENTRY_POINT}/promotion-detail/${id}`,
      data: promotionDetail
    });
  } else {
    return callApi({
      method: "post",
      url: `${API_ENTRY_POINT}/promotion-detail`,
      data: promotionDetail
    });
  }
};

export const deletePromotionHeader = ({ id }) => {
  if (id) {
    return callApi({
      method: "delete",
      url: `${API_ENTRY_POINT}/promotion-header/${id}`
    });
  }
};

export const deletePromotionDetail = ({ id }) => {
  if (id) {
    return callApi({
      method: "delete",
      url: `${API_ENTRY_POINT}/promotion-detail/${id}`
    });
  }
};
