import auth from './auth';
import {combineReducers} from 'redux';
// import storage from 'redux-persist/lib/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'],
};

const reducers = combineReducers({auth});

export default persistReducer(persistConfig, reducers);
