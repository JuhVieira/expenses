import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker';
import { NotificationContainer } from 'react-notifications';

import App from './App';
import { configureStore } from './redux/store';
import 'react-notifications/lib/notifications.css';
import './index.css';

export const store = configureStore()

store.firebaseAuthIsReady.then(() => {
    ReactDOM.render(
        <Provider store={store}>
            <App />
            <NotificationContainer />
        </Provider>,
        document.getElementById('root')
    );
})
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
