import auth from './auth';
import users from './users';
import {combineReducers} from 'redux';
// import storage from 'redux-persist/lib/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'users'],
};

const reducers = combineReducers({auth, users});

export default persistReducer(persistConfig, reducers);
