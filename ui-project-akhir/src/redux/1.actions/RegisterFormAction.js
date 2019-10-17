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
                    } else {
                        dispatch({
                            type: REGISTER_FAILED,
                            payload: 'Password dan Repeat Password harus sama!'
                        })
                    }
        } else {
            dispatch({
                type: REGISTER_FAILED,
                payload: 'Lengkapi form dan pastikan password sama!'
            })
        }
    }
}