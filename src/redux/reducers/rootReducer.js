import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

import { expenseReducer } from './expenseReducer';
import { revenueReducer } from './revenueReducer';
import { defaultReducer } from './defaultReducer';

const rootReducer = combineReducers({
    root: defaultReducer,
    expenses: expenseReducer,
    revenue: revenueReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});

export default rootReducer;