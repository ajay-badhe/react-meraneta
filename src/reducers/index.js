import CallListReducer from "./callListReducer";
import { combineReducers } from "redux"
import { loginReducer } from "./loginReducer";

const rootReducers = combineReducers(
    {
        CallList: CallListReducer,
        userSignin: loginReducer
    }
)

export default rootReducers