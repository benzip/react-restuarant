import { createRequestTypes } from "../commons/actions";

export const GET_PROMOTION_HEADERS = "GET_PROMOTIONS";
export const FIND_PROMOTIONS = "FIND_PROMOTIONS";
export const APPLY_PROMOTIONS = "APPLY_PROMOTIONS";
export const GET_PROMOTION_HEADER = "GET_PROMOTION_HEADER";
export const GET_PROMOTION_DETAILS = "GET_PROMOTION_DETAILS";
export const GET_PROMOTION_DETAIL = "GET_PROMOTION_DETAIL";
export const FIND_AND_APPLY_PROMOTIONS = "FIND_AND_APPLY_PROMOTIONS";
export const SAVE_PROMOTION_HEADER = "SAVE_PROMOTION_HEADER";
export const DELETE_PROMOTION_HEADER = "DELETE_PROMOTION_HEADER";
export const SAVE_PROMOTION_DETAIL = "SAVE_PROMOTION_DETAIL";
export const DELETE_PROMOTION_DETAIL = "DELETE_PROMOTION_DETAIL";
export const FIND_PROMOTIONS_REQUEST_TYPE = createRequestTypes(FIND_PROMOTIONS);
export const GET_PROMOTION_HEADERS_REQUEST_TYPE = createRequestTypes(GET_PROMOTION_HEADERS);
export const APPLY_PROMOTIONS_REQUEST_TYPE = createRequestTypes(APPLY_PROMOTIONS);
export const FIND_AND_APPLY_PROMOTIONS_REQUEST_TYPE = createRequestTypes(FIND_AND_APPLY_PROMOTIONS);
export const GET_PROMOTION_HEADER_REQUEST_TYPE = createRequestTypes(GET_PROMOTION_HEADER);
export const GET_PROMOTION_DETAILS_REQUEST_TYPE = createRequestTypes(GET_PROMOTION_DETAILS);
export const GET_PROMOTION_DETAIL_REQUEST_TYPE = createRequestTypes(GET_PROMOTION_DETAIL);
export const SAVE_PROMOTION_HEADER_REQUEST_TYPE = createRequestTypes(SAVE_PROMOTION_HEADER);
export const DELETE_PROMOTION_HEADER_REQUEST_TYPE = createRequestTypes(DELETE_PROMOTION_HEADER);
export const SAVE_PROMOTION_DETAIL_REQUEST_TYPE = createRequestTypes(SAVE_PROMOTION_DETAIL);
export const DELETE_PROMOTION_DETAIL_REQUEST_TYPE = createRequestTypes(DELETE_PROMOTION_DETAIL);
