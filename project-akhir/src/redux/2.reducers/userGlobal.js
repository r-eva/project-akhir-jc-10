const INITIAL_STATE = {id : 0, username : '', role : '', msg: '', isLoading: false}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'TESTING':
            return {...INITIAL_STATE, username : 'TEST'}
        case 'LOGIN_SUCCESS':
            return {...INITIAL_STATE, username : action.payload.username, id: action.payload.id, role: action.payload.role}
        case 'USERNAME_UDAH_ADA':
            return {...INITIAL_STATE, msg: action.message}
        case 'KEEP_LOGIN':
            return {...INITIAL_STATE, username : action.payload.username, id : action.payload.id, role : action.payload.role}
        case 'RESET_USER':
            return {...INITIAL_STATE}
        case 'ISLOADING':
            return {...INITIAL_STATE, isLoading: true}
        case 'BERHENTI_SWAL':
            return {...INITIAL_STATE, isLoading: false}
        default:
            return state
    }
}