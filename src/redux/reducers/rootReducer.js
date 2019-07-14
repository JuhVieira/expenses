import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

import { expenseReducer } from './expenseReducer';

const rootReducer = combineReducers({
    expenses: expenseReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});

export default rootReducer;