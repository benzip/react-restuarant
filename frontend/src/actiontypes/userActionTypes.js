import { createRequestTypes } from "../commons/actions";
export const GET_USERS = "GET_USERS";
export const GET_USER = "GET_USER";
export const ADD_USER = "ADD_USER";
export const DELETE_USER = "DELETE_USER";
export const SAVE_USER = "SAVE_USER";

export const GET_USERS_REQUEST_TYPE = createRequestTypes(GET_USERS);
export const GET_USER_REQUEST_TYPE = createRequestTypes(GET_USER);
export const ADD_USER_REQUEST_TYPE = createRequestTypes(ADD_USER);
export const SAVE_USER_REQUEST_TYPES = createRequestTypes(SAVE_USER);
export const DELETE_USER_REQUEST_TYPES = createRequestTypes(DELETE_USER);
