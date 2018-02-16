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
