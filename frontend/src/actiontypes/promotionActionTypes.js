import { createRequestTypes } from "../commons/actions";

export const GET_PROMOTIONS = "GET_PROMOTIONS";
export const FIND_PROMOTIONS = "FIND_PROMOTIONS";

export const FIND_PROMOTIONS_REQUEST_TYPE = createRequestTypes(FIND_PROMOTIONS);
export const GET_PROMOTIONS_REQUEST_TYPE = createRequestTypes(GET_PROMOTIONS);
