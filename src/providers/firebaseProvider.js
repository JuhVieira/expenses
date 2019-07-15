import firebase from '../firebase/config'
import { isLoadingModal } from '../redux/actions/rootActions';
import { store } from '../index';

export const authRef = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
export const db = firebase.firestore();


export const getCollection = async (collection, callback, user = {}) => {
    const collectionRef = await db.collection(collection);
    return collectionRef.where("user", "==", user).onSnapshot(callback);
}

export const saveItem = async (collection, body, user) => {
    store.dispatch(isLoadingModal(true))
    const collectionRef = db.collection(collection);
    if (body.id) {
        await collectionRef.doc(body.id).update(body);
        store.dispatch(isLoadingModal(false))
    } else {
        await collectionRef.add({ ...body, user: user })
        store.dispatch(isLoadingModal(false))
    }
}

export const deleteItem = async (collection, id) => {
    const collectionRef = db.collection(collection);
    return await collectionRef.doc(id).delete()
}


export const signIn = async (credentials) => {
    return await firebase.auth().signInWithEmailAndPassword(
        credentials.email,
        credentials.password
    )
}

export const signUp = async (user) => {
    const { name, email, password } = user
    const resp = await firebase.auth().createUserWithEmailAndPassword(email, password)
    return await firebase.firestore().collection('users').doc(resp.user.uid).set({
        name,
        email,
    })
}

export const logOut = async () => {
    return await firebase.auth().signOut()
}