import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { checkAuth } from "./features/user/actions";
import { useDispatch } from "./store/store";

export const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		if (localStorage.getItem("accessToken")) {
			dispatch(checkAuth());
		}
	}, [dispatch]);

	return (
		<Box minH="100vh" px={{ base: 6, md: 12 }}>
			<Header />
			<Outlet />
			<Footer />
		</Box>
	);
};
