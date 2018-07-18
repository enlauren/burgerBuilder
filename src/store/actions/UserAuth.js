import * as aType from "./actionTypes";
import axios from 'axios';



export const authStart = () => {
    return {
        type: aType.AUTH_START
    }
}

export const authSuccess = (data) => {
    return {
        type: aType.AUTH_SUCCESS,
        idToken: data.idToken,
        userId: data.localId
    }
}

export const authFail = (err) => {
    return {
        type: aType.AUTH_FAIL,
        error: err
    }
}

export const authInit = (formValues, isSignUp, token) => {
    return dispatch => {
        dispatch(authStart());
        const authData={
            email: formValues.email.value,
            password: formValues.password.value,
            returnSecureToken: true
        }

        const fD = {};
        for(let f in formValues)  {
            fD[f] = formValues[f].value
        }
        
        if(isSignUp) {
            
            
            // sending two requests, one to register auth credentials and the other to save user`s details in db
            axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyA2rwbt8stBZpixw0V1URN8_GFah-qFIYk', authData)
            .then(res => {
                fD['id'] = res.data.localId;
                console.log('----------------', fD)

                return (
                    axios.post("/orders.json?auth=" + token, fD).then(response=>{

                        console.log('==============')

                        console.log(response.data.name)
                    }).then(res => {
                        console.log('3333333333333333')
                        console.log(res)
                        dispatch(authSuccess(res.data));
                        dispatch(checkAuthTimeout(res.data.expiresIn));
        
                    })
                    .catch(err=> {
                        //console.log(err.response)
                                let e = (err.response).toLowerCase().replace(/_/g, ' ');
                                dispatch(authFail(e))
                            }) 
                    )
            })

            .catch(err => {
                console.log(err)
            //    let e = (err.res).toLowerCase().replace(/_/g, ' ');
             //   dispatch(authFail(e))
            });

        } else {
            
            // we`re signing in the user, send ajax request, if ok save token and user, else throw error

            axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyA2rwbt8stBZpixw0V1URN8_GFah-qFIYk', authData)
            .then(res => {
        //        console.log(res)
                dispatch(authSuccess(res.data));
                dispatch(checkAuthTimeout(res.data.expiresIn));
            })
            .catch(err => {
        //        console.log(err.response.data.error.message) 
                let e = (err.response.data.error.message).toLowerCase().replace(/_/g, ' ');
                dispatch(authFail(e))
            });
        }
    }
}


export const logout = () => {
    return {
        type: aType.AUTH_LOGOUT
    }    
}

export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime * 1000);
    }
}

export const emptyErrorMsg = () => {
    return {
        type: aType.DEL_ERROR_MSG
    }
}