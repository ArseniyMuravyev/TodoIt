import { EnhancedStore, configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slice";

jest.mock("./actions", () => ({
	...jest.requireActual("./actions"),
	fetchTodos: jest.fn(),
}));

describe("Тестирование thunk fetchTodos", () => {
	let store: EnhancedStore;
	beforeEach(() => {
		store = configureStore({
			reducer: {
				todo: todoReducer,
			},
		});
	});
});
