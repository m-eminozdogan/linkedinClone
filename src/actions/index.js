import db, { auth, provider, storage } from '../firebase'
import { signInWithPopup, signOut } from 'firebase/auth'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { SET_USER } from './actionType'
import { doc, collection, addDoc, setDoc } from "firebase/firestore";
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

export function postArticalApi(payload) {
    const metadata = { contentType: 'image/jpeg' }
    const storageRef = ref(storage, 'images/' + payload.image.name);
    const uploadTask = uploadBytesResumable(storageRef, payload.image, metadata);
    return (dispatch) => {

        uploadTask.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/unauthorized':
                        console.log('User doesnt have permission to access the object');
                        // User doesn't have permission to access the object
                        break;
                    case 'storage/canceled':
                        console.log('User canceled the upload');

                        // User canceled the upload
                        break;

                    // ...

                    case 'storage/unknown':
                        console.log('Unknown error occurred, inspect error.serverResponse');

                        // Unknown error occurred, inspect error.serverResponse
                        break;
                }
            },
             () => {
                // Upload completed successfully, now we can get the download URL
                 getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    console.log('File available at', downloadURL);

                    const docRef = await addDoc(collection(db, "articles"), {
                        video: payload.video,
                        sharedImg: downloadURL,
                        comments: 0,
                        description: payload.description,
                        /////////////////
                        actor: {
                            description: payload.user.email,
                            title: payload.user.displayName,
                            date: Date.now(),
                            image: payload.user.photoURL
                        }
                    });
                    console.log("Document written with ID: ", docRef.id);
                });


            }
        );
    }
}