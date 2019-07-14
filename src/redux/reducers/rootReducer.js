import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

import { expenseReducer } from './expenseReducer';
import { revenueReducer } from './revenueReducer';

const rootReducer = combineReducers({
    expenses: expenseReducer,
    revenue: revenueReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});

export default rootReducer;