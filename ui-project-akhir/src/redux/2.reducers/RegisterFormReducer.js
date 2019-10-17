import {
    REGISTER_FAILED,
    REGISTER_SUCCESS
} from '../1.actions/types'

const INITIAL_STATE = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    loading: false,
    error: '',
    registerSuccess: false,
    emailSuccess: '',
    userChecker: false,
}

export default (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case 'REGISTER_LOADING' :
            return { ...state, loading: true, error: '' }
        case REGISTER_FAILED :
            return { ...state, loading: false, error: action.payload }
        case REGISTER_SUCCESS :
            return { ...INITIAL_STATE, registerSuccess: true, userChecker: true, emailSuccess: action.payload }
        default :
            return state
    }
}