import CallListReducer from "./callListReducer";
import { combineReducers } from "redux"

const rootReducers = combineReducers(
    {
        CallList: CallListReducer
    }
)

export default rootReducers