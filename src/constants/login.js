import { BASE_URL } from "./baseUrl";

export const LOGIN_URL = `${BASE_URL}/user/auth/login`


// action constants

export const USER_SIGNIN_REQUEST = "USER_SIGNIN_REQUEST"
export const USER_SIGNIN_SUCCESS = "USER_SIGNIN_SUCCESS"
export const USER_SIGNIN_FAIL = "USER_SIGNIN_FAIL"
export const USER_SIGNOUT = "USER_SIGNOUT"