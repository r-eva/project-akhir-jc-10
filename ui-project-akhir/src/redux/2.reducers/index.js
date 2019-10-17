import {combineReducers} from 'redux';
import RegisterFormReducer from './RegisterFormReducer'
import LoginFormReducer from './LoginFormReducer'
import UserReducer from './UserReducer'

export default combineReducers({
    registerForm: RegisterFormReducer,
    loginForm: LoginFormReducer,
    user: UserReducer
})