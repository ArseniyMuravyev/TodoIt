import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "./components/layout/footer/Footer";
import { Header } from "./components/layout/header/Header";
import { fetchTodos } from "./features/todo/actions";
import { checkAuth } from "./features/user/actions";
import { useDispatch } from "./store/store";
import { responsivePadding } from "./styles";

export const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		if (localStorage.getItem("accessToken")) {
			dispatch(checkAuth());
		}
		dispatch(fetchTodos());
	}, [dispatch]);

	return (
		<Box h="100vh" px={responsivePadding}>
			<Header />
			<Outlet />
			<Footer />
		</Box>
	);
};
