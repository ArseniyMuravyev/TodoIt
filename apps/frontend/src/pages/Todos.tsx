import { FC, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch } from "../store/store";
import { TodoList } from "../components/TodoList";
import { fetchTodos } from "../features/todo/actions";

const Todos: FC = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const backgroundLocation = location.state?.backgroundLocation;

	useEffect(() => {
		dispatch(fetchTodos());
	}, []);

	return (
		<>
			<TodoList />
			{backgroundLocation && <Outlet />}
		</>
	);
};

export default Todos;
