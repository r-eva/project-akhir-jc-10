import { LOGIN_SUCCESS, USER_LOGOUT } from "../1.actions/types"

const INITIAL_STATE = {
    id: 0,
    username: '',
    email: '',
    status: '',
    token: '',
    userChecker: false
}

export default (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {...action.payload, userChecker: true}
        case USER_LOGOUT:
            return {...INITIAL_STATE}
        default:
            return state
    }
}