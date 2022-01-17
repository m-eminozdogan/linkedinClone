import { auth, provider } from '../firebase'
import { signInWithPopup } from 'firebase/auth'

export function signInApi() {
    return (dispatch) => {
        signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            console.log(result);
    
        }).catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage)
        });
        // signInWithPopup(auth, provider)
        // .then((payload) => {
        //     console.log(payload);

        // })
        // .catch((error) => {
        //     const errorMessage = error.message;
        //     console.log(errorMessage)
        // });
    }
}