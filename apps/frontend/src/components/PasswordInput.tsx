import {
	Button,
	Input,
	InputGroup,
	InputRightElement,
	Text,
} from "@chakra-ui/react";
import { FC } from "react";
import { UseFormRegister } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface FormValues {
	[password: string]: string;
}

interface IPasswordInput {
	register: UseFormRegister<FormValues>;
	onClick: () => void;
	show: boolean;
	errors: any;
	type?: string;
}

export const PasswordInput: FC<IPasswordInput> = ({
	register,
	onClick,
	show,
	errors,
	type = "password",
}) => {
	const { t } = useTranslation();

	return (
		<>
			<InputGroup>
				<Input
					type={show ? "text" : "password"}
					placeholder={t("user.password")}
					{...register(type, {
						required: t("user.password_required"),
						minLength: {
							value: 6,
							message: t("user.password_too_short"),
						},
					})}
				/>
				<InputRightElement w="4.5rem">
					<Button h="1.75rem" size="sm" onClick={onClick}>
						{show ? "Hide" : "Show"}
					</Button>
				</InputRightElement>
			</InputGroup>
			{errors.password && (
				<Text color="red.500">{errors.password.message}</Text>
			)}
		</>
	);
};
