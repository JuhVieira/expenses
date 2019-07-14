import firebase from '../firebase/config'
import { isLoadingModal } from '../redux/actions/rootActions';
import { store } from '../index';

export const authRef = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
export const db = firebase.firestore();


export const getCollection = async (collection, callback, { name, operator, value } = {}) => {
    const collectionRef = await db.collection(collection);
    return collectionRef.onSnapshot(callback);
}

export const saveItem = async (collection, body) => {
    store.dispatch(isLoadingModal(true))
    const collectionRef = db.collection(collection);
    if (body.id) {
        await collectionRef.doc(body.id).update(body);
        store.dispatch(isLoadingModal(false))
    } else {
        await collectionRef.add(body)
        store.dispatch(isLoadingModal(false))
    }
}

export const addItem = async (collection, body) => {
    const collectionRef = db.collection(collection);
    await collectionRef.add(body);
}

export const deleteItem = async (collection, id) => {
    const collectionRef = db.collection(collection);
    return await collectionRef.doc(id).delete()
}
