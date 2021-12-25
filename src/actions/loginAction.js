
import axios from "axios";
import { LOGIN_URL, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT } from "../constants/login";

export const signin = (userName, password, dispatch) => {
    dispatch({
        type: USER_SIGNIN_REQUEST,
    });
    const body = {
        "username": userName,
        "password": password,
        "deviceId": "dapxDzCySkg:APA91bFte8-oCXMYKJp016cUG7DcGprawTKhzxOSVXA7B55TzYTuYPTPZ6QLAT3Ei8wu0WKc0eIbBlQJosDq50s_fn66Bu0RRla2sPKNEBorqRJfTwTAlC_ssuCSb6Fur7PgqnMHeseo"
    };
    axios.post(LOGIN_URL, body)
        .then(response => {
            dispatch({
                type: USER_SIGNIN_SUCCESS,
                payload: response.data
            })
            localStorage.setItem("authToken", JSON.stringify(response.data?.accessToken))
        })
        .catch(error => {
            dispatch({
                type: USER_SIGNIN_FAIL,
                payload: error
            })
        })
}

export const signout = () => (dispatch) => {
    dispatch({ type: USER_SIGNOUT })
}