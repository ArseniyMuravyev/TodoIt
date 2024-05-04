import { ITodo } from "@arseniy/types";
import { Box, Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { Check, Pencil, Save, Trash2, X } from "lucide-react";
import { ChangeEvent, FC, MouseEventHandler, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import {
	completeTodo,
	getTodoById,
	removeTodo,
	updateTodo,
} from "../features/todo/actions";
import { useToast } from "../hooks/useToast";
import { useDispatch, useSelector } from "../store/store";
import { formatDate } from "../utils/helpers";
import { Modal } from "./Modal";

export interface IConfirmDeletion {
	handleDelete: MouseEventHandler<HTMLButtonElement>;
	handleCloseModal: () => void;
}

export const TodoInfo: FC = () => {
	const { id } = useParams<{ id: string }>();
	const dispatch = useDispatch();
	const [isEditing, setIsEditing] = useState(false);
	const [title, setTitle] = useState("");
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const { showSuccess } = useToast();
	const navigate = useNavigate();
	const { t } = useTranslation();

	useEffect(() => {
		if (id) {
			dispatch(getTodoById(id));
		}
	}, [dispatch, id]);

	const todo = useSelector((state) =>
		state.todo.todos.find((todo) => todo._id === id)
	) as ITodo;

	useEffect(() => {
		if (todo?.title) {
			setTitle(todo.title);
		}
	}, [todo]);

	const toggleEditing = () => {
		setIsEditing((prev) => !prev);
	};

	const handleSave = () => {
		if (id && title) {
			dispatch(updateTodo({ _id: id, newTitle: title }));
			showSuccess(t("success.update"));
			setIsEditing(false);
		}
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value);
	};

	const handleDelete = () => {
		dispatch(removeTodo(todo._id));
		setIsDeleteModalOpen(false);
		showSuccess(t("success.delete"));
		navigate(-1);
	};

	const handleComplete = () => {
		dispatch(completeTodo(todo));
	};

	const handleOpenModal = () => {
		setIsDeleteModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsDeleteModalOpen(false);
	};

	return (
		<Box py="4" px="4" w="100%">
			{isEditing ? (
				<Input
					value={title}
					onChange={handleChange}
					size="sm"
					autoFocus
					placeholder={t("todos.task_name")}
				/>
			) : (
				<Heading as="h3" size="md">
					{todo?.title}
				</Heading>
			)}
			<Flex justifyContent="space-between" mt="20" alignItems="center">
				<Text w="40">
					{t("modal.status")}
					{todo?.completed ? t("modal.done") : t("modal.not_done")}
				</Text>
				{todo?.date && <Text>{formatDate(todo.date.toString())}</Text>}
				<Button
					onClick={handleComplete}
					colorScheme={todo?.completed ? "orange" : "green"}
					w="10"
					size="sm"
				>
					{todo?.completed ? <X /> : <Check />}
				</Button>
				{isEditing ? (
					<Button onClick={handleSave} colorScheme="blue" size="sm" w="10">
						<Save />
					</Button>
				) : (
					<Button onClick={toggleEditing} colorScheme="yellow" size="sm" w="10">
						<Pencil />
					</Button>
				)}
				<Button onClick={handleOpenModal} colorScheme="red" w="10" size="sm">
					<Trash2 />
				</Button>
				{isDeleteModalOpen && (
					<Modal title={t("modal.todo_title")} handleClose={handleCloseModal}>
						<ConfirmTodoDeletion
							handleDelete={handleDelete}
							handleCloseModal={handleCloseModal}
						/>
					</Modal>
				)}
			</Flex>
		</Box>
	);
};

const ConfirmTodoDeletion: FC<IConfirmDeletion> = ({
	handleDelete,
	handleCloseModal,
}) => {
	const { t } = useTranslation();
	return (
		<Flex align='center' mt="28" gap="8">
			<Button colorScheme="red" mr={3} onClick={handleDelete} w="24">
				{t("modal.delete")}
			</Button>
			<Button onClick={handleCloseModal} w="24">
				{t("user.cancel")}
			</Button>
		</Flex>
	);
};
