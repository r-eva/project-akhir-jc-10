import Axios from 'axios'
import {urlApi} from '../../helpers/database'
import swal from 'sweetalert'

export const onLogin = (userObject) => {
    return (dispatch) => {
        dispatch({type: 'ISLOADING'})

        if (userObject.username === '' || userObject.password === '') {
            dispatch({type: 'BERHENTI_SWAL'})
            swal({icon: "warning", text: "Mohon lengkapi data username dan password."})
        } else {
            Axios
                .get(urlApi + 'users', {
                params: {
                    username: userObject.username,
                    password: userObject.password
                }
            })
                .then((res) => {
                    if (res.data.length > 0) {
                        dispatch({
                            type: 'LOGIN_SUCCESS',
                            payload: {
                                username: res.data[0].username,
                                role: res.data[0].role,
                                id: res.data[0].id
                            }
                        })
                    } else {
                        dispatch({type: 'BERHENTI_SWAL'})
                        swal({icon: "warning", text: "Invalid username or password."})
                    }
                })
                .catch((err) => {
                    console.log(err)
                    dispatch({type: 'BERHENTI_SWAL'})
                    swal('System Error', 'Please contact the administrator.', 'error')
                })
        }
    }
}

export const onRegister = (userObject) => {
    return (dispatch) => {

        dispatch({type: 'ISLOADING'})
        if (userObject.username === '' || userObject.password === '' || userObject.email === '' || userObject.repeatPassword === '') {
            dispatch({type: 'BERHENTI_SWAL'})
            swal({icon: "warning", text: "Mohon lengkapi datanya."})
        } else if (userObject.username.length < 4 || userObject.password.length < 4) {
            dispatch({type: 'BERHENTI_SWAL'})
            swal({icon: "warning", text: "Mohon isi username dan password minimal 4 karakter."})
        } else if (/@/.test(userObject.email) === false) {
            dispatch({type: 'BERHENTI_SWAL'})
            swal({icon: "warning", text: "Invalid email."})
        } else if (userObject.password !== userObject.repeatPassword) {
            dispatch({type: 'BERHENTI_SWAL'})
            swal({icon: "warning", text: "Password tidak sama."})
        } else {
            Axios.get(urlApi + 'users', {
                params: {
                    username: userObject.username
                }
            })
                .then((res) => {
                    if (res.data.length > 0) {
                        dispatch({type: 'USERNAME_UDAH_ADA', message: 'Username sudah ada, mohon input username lain!'})
                    } else {
                        userObject.role = 'users'
                        Axios
                            .post(urlApi + 'users', userObject)
                            .then((res) => {
                                dispatch({
                                    type: 'LOGIN_SUCCESS',
                                    payload: {
                                        username: res.data.username,
                                        password: res.data.password,
                                        id: res.data.id
                                    }
                                })
                            })
                            .catch((err) => {
                                console.log(err)
                                dispatch({type: 'BERHENTI_SWAL'})
                                swal('System Error', 'Please contact the administrator.', 'error')
                            })
                    }
                })
                .catch((err) => {
                    console.log(err)
                    dispatch({type: 'BERHENTI_SWAL'})
                    swal('System Error', 'Please contact the administrator.', 'error')
                })
        }
    }
}

export const keepLogin = (cookieData) => {
    return (dispatch) => {
        Axios
            .get(urlApi + 'users', {
            params: {
                username: cookieData
            }
        })
            .then((res) => {
                dispatch({
                    type: 'KEEP_LOGIN',
                    payload: {
                        username: res.data[0].username,
                        role: res.data[0].role,
                        id: res.data[0].id
                    }
                })
            })
            .catch((err) => {
                console.log(err)
                dispatch({type: 'BERHENTI_SWAL'})
                swal('System Error', 'Please contact the administrator.', 'error')
            })
    }
}

export const resetUser = () => {
    return (dispatch) => {
        dispatch({type: 'RESET_USER'})
    }
}