import * as aType from '../actions/actionTypes'


const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case aType.AUTH_START:
            return {
                ...state,
                loading: true,
            }
        case aType.AUTH_SUCCESS:
            return {
                ...state,
                loading: false,
                token: action.idToken,
                userId: action.userId,
            }
        case aType.AUTH_FAIL:
            return {
                ...state,
                error: action.error,
                loading: false
            }
        case aType.AUTH_LOGOUT:
            return {
                ...state,
                token:null,
                userId: null,
            }
        case aType.DEL_ERROR_MSG:
            return   {
                ...state,
                error: null,
            }
        default:
        return state;
    }
}

export default reducer;