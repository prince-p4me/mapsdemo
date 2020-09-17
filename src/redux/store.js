import { createStore } from "redux";
import rootReducer from "./reducers";
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

const persistConfig = {
  // Root
  key: 'root',
  // Storage Method (React Native)
  storage: AsyncStorage,
  // Whitelist (Save Specific Reducers)
  whitelist: [
    "user", "employees",
  ],
  blacklist: []
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

let store = createStore(
  persistedReducer,
)

// Middleware: Redux Persist Persister
let persistor = persistStore(store);

export { store, persistor }