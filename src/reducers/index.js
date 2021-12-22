import CallListReducer from "./callList";
import { combineReducers } from "redux"

const reducers = combineReducers(
    {
        CallList: CallListReducer
    }
)

export default reducers