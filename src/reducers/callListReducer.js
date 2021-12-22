import { SET_CALL_LIST_BEGIN, SET_CALL_LIST_FAIL, SET_CALL_LIST_SUCCESS } from "../constants/callListActionConstant";

const intialState = {
    loading: false,
    CallList: [],
    error: []
};
const CallListReducer = (state = intialState, action) => {
    switch (action.type) {
        case SET_CALL_LIST_BEGIN:
            return {
                ...state,
                loading: true,
                error: []
            }

        case SET_CALL_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                CallList: action.payload,
            };

        case SET_CALL_LIST_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        default:
            return state;
    }
}
export default CallListReducer;
