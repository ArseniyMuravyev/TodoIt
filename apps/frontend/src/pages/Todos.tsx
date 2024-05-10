import { FC } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { TodoList } from "../components/todo-page/TodoList";
import { Section } from "../styles";

const Todos: FC = () => {
	const location = useLocation();
	const backgroundLocation = location.state?.backgroundLocation;

	return (
		<Section delay={0.2}>
			<TodoList />
			{backgroundLocation && <Outlet />}
		</Section>
	);
};

export default Todos;
