import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import {AuthReducer} from './AuthSlice';
import createSensitiveStorage from '@utilities/SensitiveStorage';
import {APP_ACTIONS} from '@utilities/constants';
import {ArticlesReducer} from './ArticlesSlice';
import {encryptTransform} from 'redux-persist-transform-encrypt';

const encryptor = encryptTransform({
  secretKey: 'hulu-lala',
  onError: function (error) {
    console.warn('Error while encryption: ', error);
  },
});

//securing sensitive info
// const sensitiveStorage = createSensitiveStorage({
//   keychainService: 'nytKeychain',
//   sharedPreferencesName: 'nytSharedPrefs',
// });
// combining all reducers to persist them

// const tokenPersistConfig = {
//   key: 'authPersist',
//   storage: sensitiveStorage,
// };
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  transforms: [encryptor],
  blacklist: ['auth'],
  version: 1,
};
const appReducer = combineReducers({
  auth: persistReducer(persistConfig, AuthReducer),
  articles: persistReducer(persistConfig, ArticlesReducer),
});

//we can handle globally for logout etc actions but will skip in case we want users data to remain there in case of prepopulated email password for relogin
// const rootReducer: Reducer = (state: RootState, actions: AnyAction) => {
//   // To handle any global action such as logout etc
//   if (actions.type === APP_ACTIONS.LOGOUT) {
//     state = {} as RootState;
//   }
//   return appReducer(state, actions);
// };

const persistedReducer = appReducer;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof appReducer>;

export default persistedReducer;
