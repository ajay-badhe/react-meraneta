import axios from "axios";
import { CALL_LIST } from "../constants/callList";
import { SET_CALL_LIST_BEGIN, SET_CALL_LIST_FAIL, SET_CALL_LIST_SUCCESS } from "../constants/callListActionConstant";
import { headers } from "../constants/Token";




export const fetchCallList = (dispatch, page, startDate, endDate, search, priorityFilter, assemblies) => {
    const body = {
        "dateFrom": startDate || "",
        "dateTo": endDate || "",
        "search": search || "",
        "priority": priorityFilter || "",
        "assembly": assemblies || "",
        "page": {
            "number": page,
            "size": 10
        }
    };
    dispatch({
        type: SET_CALL_LIST_BEGIN
    })

    axios.post(CALL_LIST, body, {
        headers
    })
        .then(response => {
            dispatch({
                type: SET_CALL_LIST_SUCCESS,
                payload: response.data
            })
        })
        .catch(err => {
            console.log({ err })
            dispatch({
                type: SET_CALL_LIST_FAIL,
                payload: err
            })
        })
};
