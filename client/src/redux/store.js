import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./baseApiSlice";
import authReducer from "../redux/features/auth/authSlice";
import dialogReducer from "@/redux/features/responsiveDialog/dialogSlice";
import {
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
	persistReducer,
	persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { setupListeners } from "@reduxjs/toolkit/query";

const rootReducer = combineReducers({
	auth: authReducer,
	dialog: dialogReducer,
	[baseApi.reducerPath]: baseApi.reducer,
});

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const makeStore = () =>
	configureStore({
		reducer: persistedReducer,
		devTools: process.env.NODE_ENV !== "production",
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				serializableCheck: {
					ignoredActions: [
						FLUSH,
						REHYDRATE,
						PAUSE,
						PERSIST,
						PURGE,
						REGISTER,
					],
				},
			}).concat(baseApi.middleware),
	});

export const store = makeStore();
setupListeners(store.dispatch);
export const persistor = persistStore(store);
export const purgeData = async () => {
	await persistor.purge();
};
