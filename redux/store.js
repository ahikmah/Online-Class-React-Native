import {createStore, applyMiddleware} from 'redux';
import {persistStore} from 'redux-persist';

import rootReducer from './Reducers';
import rpm from 'redux-promise-middleware';

const enhancers = applyMiddleware(rpm);
export const store = createStore(rootReducer, enhancers);
export const persistor = persistStore(store);
