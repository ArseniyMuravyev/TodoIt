import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
	TypedUseSelectorHook,
	useDispatch as dispatchHook,
	useSelector as selectorHook,
} from "react-redux";
import todoReducer from "../features/todo/slice";
import userReducer from "../features/user/slice";

export const rootReducer = combineReducers({
	todo: todoReducer,
	user: userReducer,
});

const store = configureStore({
	reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
