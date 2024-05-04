import { Box, Button, Flex, Input } from "@chakra-ui/react";
import { CirclePlus } from "lucide-react";
import { Dispatch, FC, KeyboardEvent, SetStateAction, useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { createTodo } from "../features/todo/actions";
import { useDispatch } from "../store/store";
import { DatePicker } from "./DatePicker";

interface ICreateTodoInput {
	setIsInputVisible: Dispatch<SetStateAction<boolean>>;
	setIsAddTodoButtonVisible: Dispatch<SetStateAction<boolean>>;
}

interface IFormInput {
	title: string;
	date: Date | null;
}

export const CreateTodoInput: FC<ICreateTodoInput> = ({
	setIsInputVisible,
	setIsAddTodoButtonVisible,
}) => {
	const dispatch = useDispatch();
	const { t } = useTranslation();

	const { control, register, handleSubmit, setFocus } = useForm<IFormInput>({
		defaultValues: {
			title: "",
			date: new Date(),
		},
	});

	const onSubmit: SubmitHandler<IFormInput> = (data) => {
		const trimmedTitle = data.title.trim();

		if (trimmedTitle) {
			dispatch(createTodo(data));
			setIsInputVisible(false);
			setIsAddTodoButtonVisible(true);
		}
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Escape") {
			setIsInputVisible(false);
			setIsAddTodoButtonVisible(true);
		}
	};

	useEffect(() => {
		setFocus("title");
	}, [setFocus]);

	return (
		<Box mt="4">
			<form onSubmit={handleSubmit(onSubmit)}>
				<Flex
					gap="4"
					h={{ base: "100%", md: "10" }}
					flexDirection={{ base: "column", md: "row" }}
				>
					<Input
						type="text"
						{...register("title", { required: true })}
						placeholder={t("todos.task_name")}
						onKeyDown={handleKeyDown}
						maxW={{ base: "100%", md: "160" }}
						h={{ base: "10", md: "100%" }}
						textAlign="center"
					/>
					<Flex alignItems="center" gap="2">
						<Controller
							control={control}
							name="date"
							rules={{ required: "Date is required" }}
							render={({ field }) => (
								<DatePicker
									date={field.value}
									setDate={(date) => field.onChange(date)}
								/>
							)}
						/>
						<Button type="submit" h="100%" bg="none">
							<CirclePlus size="20" />
						</Button>
					</Flex>
				</Flex>
			</form>
		</Box>
	);
};
