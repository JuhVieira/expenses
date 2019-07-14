import firebase from '../firebase/config'
import updateExpenses from '../redux/actions/expensesActions'

export const authRef = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
export const db = firebase.firestore();


export const getCollection = async (collection, callback, { name, operator, value } = {}) => {
    const collectionRef = await db.collection('expenses');
    return collectionRef.onSnapshot(callback);
}
export const saveExpense = async (body) => {
    const collectionRef = db.collection('expenses');
    if(body.id){
        await collectionRef.doc(body.id).update(body);
    } else {
        await collectionRef.add(body)
    }
}

export const addExpense = async (body) => {
    const collectionRef = db.collection('expenses');
    await collectionRef.add(body);
}

export const deleteExpense = async (id)=>{
    const collectionRef = db.collection('expenses');
    return await collectionRef.doc(id).delete()
}