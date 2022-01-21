import { auth, provider } from '../firebase'
import { signInWithPopup, signOut } from 'firebase/auth'
import { SET_USER } from './actionType'

export const setUser = (payload) => ({
    type: SET_USER,
    user: payload,
});

export function signInApi() {

    return (dispatch) => {
        signInWithPopup(auth, provider)
            .then((payload) => {
                //console.log(payload);
                dispatch(setUser(payload.user));
            }).catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage)
            });
    }
}

export function getUserAuth() {

    return (dispatch) => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                dispatch(setUser(user))
            }
        })
    }
}

export function signOutApi() {
    return (dispatch) => {

        signOut(auth).then(() => {
            // Sign-out successful.
            dispatch(setUser(null))
        }).catch((error) => {
            // An error happened.
            console.log(error.message);
            alert('çıkış yapılırken hata')
        });
    }

}