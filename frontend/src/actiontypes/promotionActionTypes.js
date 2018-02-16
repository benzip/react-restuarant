import { createRequestTypes } from "../commons/actions";

export const GET_PROMOTIONS = "GET_PROMOTIONS";
export const FIND_PROMOTIONS = "FIND_PROMOTIONS";
export const APPLY_PROMOTIONS = "APPLY_PROMOTIONS";

export const FIND_AND_APPLY_PROMOTIONS = "FIND_AND_APPLY_PROMOTIONS";
export const FIND_PROMOTIONS_REQUEST_TYPE = createRequestTypes(FIND_PROMOTIONS);
export const GET_PROMOTIONS_REQUEST_TYPE = createRequestTypes(GET_PROMOTIONS);
export const APPLY_PROMOTIONS_REQUEST_TYPE = createRequestTypes(APPLY_PROMOTIONS);
export const FIND_AND_APPLY_PROMOTIONS_REQUEST_TYPE = createRequestTypes(FIND_AND_APPLY_PROMOTIONS);
