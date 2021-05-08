import {createStore, applyMiddleware, compose} from 'redux';
import {persistStore} from 'redux-persist';
import {createLogger} from 'redux-logger';

import rootReducer from './Reducers';
import rpm from 'redux-promise-middleware';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const logger = createLogger();

const enhancers = composeEnhancers(
  applyMiddleware(rpm),
  // other store enhancers if any
);
export const store = createStore(rootReducer, enhancers);
export const persistor = persistStore(store);
