import { FC, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { TodoList } from "../components/TodoList";
import { fetchTodos } from "../features/todo/actions";
import { useDispatch } from "../store/store";
import { Section } from "../styles";

const Todos: FC = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const backgroundLocation = location.state?.backgroundLocation;

	useEffect(() => {
		dispatch(fetchTodos());
	}, [dispatch]);

	return (
		<Section delay={0.2}>
			<TodoList />
			{backgroundLocation && <Outlet />}
		</Section>
	);
};

export default Todos;
