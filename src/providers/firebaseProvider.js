import firebase from '../firebase/config'

export const authRef = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
export const db = firebase.firestore();


export const getCollection = async (collection, callback, { name, operator, value } = {}) => {
    const collectionRef = await db.collection(collection);
    return collectionRef.onSnapshot(callback);
}

export const saveItem = async (collection, body) => {
    const collectionRef = db.collection(collection);
    if(body.id){
        await collectionRef.doc(body.id).update(body);
    } else {
        await collectionRef.add(body)
    }
}

export const addItem = async (collection, body) => {
    const collectionRef = db.collection(collection);
    await collectionRef.add(body);
}

export const deleteItem = async (collection, id)=>{
    const collectionRef = db.collection(collection);
    return await collectionRef.doc(id).delete()
}
