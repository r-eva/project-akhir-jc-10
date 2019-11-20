import {
    REGISTER_FAILED,
    REGISTER_SUCCESS
} from './types'
import axios from 'axios'
import {urlApi} from '../../helpers/database'

export const registerUser = (user) => {
    return (dispatch) => {
        dispatch({ type: 'REGISTER_LOADING' })
        if (user.email !== '' && user.username !== ''
            && user.username !== '' && user.confirmEmail !== '' && user.confirmPassword !== '') {
                    if (user.password === user.confirmPassword) {
                        var emailValidator = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
                        if (!emailValidator.test(user.email)) {
                            dispatch({
                                type: REGISTER_FAILED,
                                payload: 'Email address is not valid!'
                            })
                        } else {
                            axios.post(urlApi + 'user/register', {
                                email: user.email,
                                password: user.password,
                                username: user.username,
                                role: 'user'
                            })
                            .then((res) => {
                                dispatch({
                                    type: REGISTER_SUCCESS,
                                    payload: res.data.email
                                })
                            })
                            .catch((err) => {
                                console.log(err.response)
                                if (err.response.data.error) {
                                    dispatch({
                                        type: REGISTER_FAILED,
                                        payload: err.response.data.message
                                    })
                                } else if (!err.response.data.error) {
                                    dispatch({
                                        type: REGISTER_SUCCESS,
                                        payload: err.response.data.email
                                    })
                                }
                            })

                        }
                    } else {
                        dispatch({
                            type: REGISTER_FAILED,
                            payload: 'Password and its confirmed password shall be equal!'
                        })
                    }
        } else {
            dispatch({
                type: REGISTER_FAILED,
                payload: 'Please complete the form, make sure password you enter is equal with its confirmed pasword!'
            })
        }
    }
}