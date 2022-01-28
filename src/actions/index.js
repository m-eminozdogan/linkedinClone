import db, { auth, provider, storage } from '../firebase'
import { signInWithPopup, signOut } from 'firebase/auth'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { SET_USER, SET_LOADING_STATUS, GET_ARTICLES } from './actionType'
import { collection, addDoc, setDoc, doc, onSnapshot } from "firebase/firestore";
export const setUser = (payload) => ({
    type: SET_USER,
    user: payload,
});
export const setLoading = (status) => ({
    type: SET_LOADING_STATUS,
    status: status
})
export const getArticles = (payload) => ({
    type: GET_ARTICLES,
    payload: payload
})
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
        dispatch(setLoading(true))

        if (payload.image !== "") {
            console.log('image koşuluna girdi');
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
                        default:
                            dispatch(setLoading(false))
                            break;
                    }
                },
                (error) => {
                    // A full list of error codes is available at
                    // https://firebase.google.com/docs/storage/web/handle-errors
                    switch (error.code) {
                        case 'storage/unauthorized':
                            console.log('User doesnt have permission to access the object');
                            dispatch(setLoading(false))

                            // User doesn't have permission to access the object
                            break;
                        case 'storage/canceled':
                            console.log('User canceled the upload');
                            dispatch(setLoading(false))

                            // User canceled the upload
                            break;
                        // ...
                        case 'storage/unknown':
                            console.log('Unknown error occurred, inspect error.serverResponse');
                            dispatch(setLoading(false))

                            // Unknown error occurred, inspect error.serverResponse
                            break;
                        default:
                            break;
                    }
                },
                () => {
                    // Upload completed successfully, now we can get the download URL
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        console.log('File available at', downloadURL);
                        //////////time calc////////
                        var currentdate = new Date();
                        var datetime = "time" + currentdate.getDate()
                            + (currentdate.getMonth() + 1)
                            + currentdate.getFullYear()
                            + currentdate.getHours()
                            + currentdate.getMinutes()
                            + currentdate.getSeconds();
                        ////////////////
                        const docRef = await addDoc(collection(db, "articles"), {

                            additionalTime: datetime,
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
                        dispatch(setLoading(false))
                        console.log("Document written with ID: ", docRef.id);
                    });
                }
            );
            console.log("image koşulu bitti");

        }
        //else if buraya
        else if (payload.video) {
            console.log("video koşuluna girdi");
            //////////time calc////////
            var currentdate = new Date();
            var datetime = "time" + currentdate.getDate()
                + (currentdate.getMonth() + 1)
                + currentdate.getFullYear()
                + currentdate.getHours()
                + currentdate.getMinutes()
                + currentdate.getSeconds();
            /////////////////
            const docData = {
                video: payload.video,
                sharedImg: "",
                comments: 0,
                description: payload.description,
                /////////////////
                actor: {
                    description: payload.user.email,
                    title: payload.user.displayName,
                    date: Date.now(),
                    image: payload.user.photoURL
                }
            };
            setDoc(doc(db, "articles", `${payload.user.uid}${datetime}`), docData);
            dispatch(setLoading(false))

            console.log("video koşulu sona erdi");
        }
    }
}

export function getArticlesApi() {
    return async (dispatch) => {

        onSnapshot(collection(db, 'articles'), (snapshot) => {
            let payload = snapshot.docs.map((doc) => {
                // console.log(doc.data());
                return { id: doc.id, ...doc.data() }
            })
            dispatch(getArticles(payload))
        })

    }
}