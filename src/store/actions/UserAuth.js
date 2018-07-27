import * as aType from "./actionTypes";
import axios from "axios";
import axiosBase from "../../axios-orders";

export const authStart = () => {
    return {
        type: aType.AUTH_START
    };
};

export const authSuccess = data => {
    return {
        type: aType.AUTH_SUCCESS,
        idToken: data.idToken,
        userId: data.localId
    };
};

export const authFail = err => {
    return {
        type: aType.AUTH_FAIL,
        error: err
    };
};

export const authInit = (formValues, isSignUp, token) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: formValues.email.value,
            password: formValues.password.value,
            returnSecureToken: true
        };

        const fD = { active: false };
        for (let f in formValues) {
            fD[f] = formValues[f].value;
        }

        if (isSignUp) {
            // sending two requests, one to register auth credentials and the other to save user`s details in db
            axios
                .post(
                    "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyA2rwbt8stBZpixw0V1URN8_GFah-qFIYk",
                    authData
                )
                .then(res => {
                    const userObject = {
                        [res.data.localId]: { customer: fD, orders: {} }
                    };
                    console.log("============== First request ===========");
                    console.log(res);
                    return axiosBase
                        .put(
                            "/orders.json?auth=" + res.data.idToken,
                            userObject
                        )
                        .then(response => {
                            console.log(
                                "============== Second request ==========="
                            );
                            console.log(response);
                            return response; //if just in case the response is required in second then
                        })
                        .then(response => {
                            console.log(
                                "=====First request and second OK - Dispatch action ====="
                            );
                            console.log(
                                "Save data from first request ( token, user) in state."
                            );
                            const expirationDate = new Date(
                                new Date().getTime() + res.data.expiresIn * 1000
                            );
                            localStorage.setItem("token", res.data.idToken);
                            localStorage.setItem(
                                "expirationDate",
                                expirationDate
                            );
                            localStorage.setItem("userId", res.data.localId);
                            dispatch(authSuccess(res.data));
                            dispatch(checkAuthTimeout(res.data.expiresIn));
                        })
                        .catch(err => {
                            let e = err.response.data.error.message
                                .toLowerCase()
                                .replace(/_/g, " ");
                            dispatch(authFail(e));
                        });
                })
                .catch(err => {
                    let e = err.response.data.error.message
                        .toLowerCase()
                        .replace(/_/g, " ");
                    dispatch(authFail(e));
                });
        } else {
            // we`re signing in the user, send ajax request, if ok save token and user, else throw error

            axios
                .post(
                    "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyA2rwbt8stBZpixw0V1URN8_GFah-qFIYk",
                    authData
                )
                .then(res => {
                    //        console.log(res)
                    const expirationDate = new Date(
                        new Date().getTime() + res.data.expiresIn * 1000
                    );
                    localStorage.setItem("token", res.data.idToken);
                    localStorage.setItem("expirationDate", expirationDate);
                    localStorage.setItem("userId", res.data.localId);
                    dispatch(authSuccess(res.data));
                    dispatch(checkAuthTimeout(res.data.expiresIn));
                })
                .catch(err => {
                    //        console.log(err.response.data.error.message)
                    let e = err.response.data.error.message
                        .toLowerCase()
                        .replace(/_/g, " ");
                    dispatch(authFail(e));
                });
        }
    };
};

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("userId");
    return {
        type: aType.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const emptyErrorMsg = () => {
    return {
        type: aType.DEL_ERROR_MSG
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem("token");
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(
                localStorage.getItem("expirationDate")
            );
            if (expirationDate < new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem("userId");
                let data = { idToken: token, localId: userId };
                dispatch(authSuccess(data));
                dispatch(
                    checkAuthTimeout(
                        (expirationDate.getTime() - new Date().getTime()) / 1000
                    )
                );
            }
        }
    };
};
