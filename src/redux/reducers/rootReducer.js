import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';

import { expenseReducer } from './expenseReducer';
import { revenueReducer } from './revenueReducer';
import { defaultReducer } from './defaultReducer';

const rootReducer = combineReducers({
    root: defaultReducer,
    expenses: expenseReducer,
    revenue: revenueReducer,
    firebase: firebaseReducer
});

export default rootReducer;