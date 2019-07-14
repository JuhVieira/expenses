import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { reduxFirebase ,getFirebase } from 'react-redux-firebase'
import { reduxFirestore ,getFirestore } from 'redux-firestore'
import thunk from 'redux-thunk'

import rootReducer from './reducers/rootReducer'
import firebaseConfig from '../firebase/config'

export const configureStore = preloadedState => {
  const middlewares = [thunk.withExtraArgument({getFirebase, getFirestore})]

  const middlewareEnhancer = applyMiddleware(...middlewares)

  const storeEnhancers = [
    middlewareEnhancer,
    reduxFirestore(firebaseConfig),
    reduxFirebase(
      firebaseConfig,
      {useFirestoreForProfile: true, userProfile: 'users', attachAuthIsReady: true}
    )
  ]

  const composedEnhancer = composeWithDevTools(...storeEnhancers)

  const store = createStore(
    rootReducer,
    preloadedState,
    composedEnhancer
  )

  return store
}
