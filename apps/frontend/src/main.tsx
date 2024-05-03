import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { router } from "./components/AppRouter";
import "./i18n";
import store from "./store/store";

const theme = extendTheme({
	colors: {
		brand: {
			100: "#f7fafc",
			900: "#1a202c",
		},
	},
});

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<StrictMode>
		<Provider store={store}>
			<ChakraProvider theme={theme}>
				<RouterProvider router={router} />
			</ChakraProvider>
		</Provider>
	</StrictMode>
);
