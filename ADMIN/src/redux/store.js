import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userRedux";
import productReducer from "./productRedux";
import articleReducer from "./articleRedux";
import archiveReducer from "./archiveRedux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["user", "article", "product", "archive"]
};

const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
  article: articleReducer,
  archive: archiveReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);