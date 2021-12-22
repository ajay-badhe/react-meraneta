const intialState = {
    CallList: [],
};
const CallListReducer = (state = intialState, action) => {
    switch (action.type) {
        case "SET_CALL_LIST": return { ...state, CallList: action.payload };
        default: return state;
    }
}
export default CallListReducer;