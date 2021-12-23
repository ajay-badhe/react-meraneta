import axios from "axios";
import { CALL_LIST, DELETE_CALL_LIST } from "../constants/callList";
import { SET_CALL_LIST_BEGIN, SET_CALL_LIST_FAIL, SET_CALL_LIST_SUCCESS } from "../constants/callListActionConstant";
import { headers } from "../constants/Token";




export const fetchCallList = (dispatch, page, startDate, endDate, search, priorityFilter) => {
    const body = {
        "dateFrom": startDate || "",
        "dateTo": endDate || "",
        "search": search || "",
        "priority": priorityFilter || "",
        "page": {
            "number": page || 0,
            "size": 10
        }
    };
    console.log("Bpda bdaya==", body);
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


// Delete Handler
export const deleteHandler = (deletedData, dispatch) => {
    deletedData.recordStatus = 'DELETED'
    const body = deletedData;
    axios.put(DELETE_CALL_LIST + '/' + deletedData.id, body, {
        headers
    })
        .then(response => {

            fetchCallList(dispatch)
        }).catch(err => {
            console.log({ err })
        })
}