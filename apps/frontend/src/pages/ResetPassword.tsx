import {
	Box,
	Button,
	FormControl,
	FormErrorMessage,
	Heading,
	Text,
	VStack,
} from "@chakra-ui/react";
import { ChangeEvent, FC, SyntheticEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { FormInput } from "../components/FormInput";
import { PasswordInput } from "../components/PasswordInput";
import { resetPassword } from "../features/user/actions";
import { useDispatch } from "../store/store";

const ResetPassword: FC = () => {
	const navigate = useNavigate();
	const [newPassword, setNewPassword] = useState("");
	const [resetCode, setResetCode] = useState("");
	const [error, setError] = useState<Error | null>(null);
	const [show, setShow] = useState(false);
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleClick = () => setShow((prev) => !prev);

	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		if (isSubmitting) {
			return;
		}
		setIsSubmitting(true);
		setError(null);
		const email = localStorage.getItem("resetEmail");

		if (email && newPassword && resetCode) {
			dispatch(resetPassword({ email, resetCode, newPassword }))
				.unwrap()
				.then(() => {
					localStorage.removeItem("resetEmail");
					navigate("/login");
				})
				.catch((err: Error) => {
					setError(err);
				});
		} else {
			setError(
				new Error(
					"Необходимо ввести адрес электронной почты, код из письма и новый пароль."
				)
			);
		}

		setIsSubmitting(false);
	};

	useEffect(() => {
		if (!localStorage.getItem("resetEmail")) {
			navigate("/forgot-password", { replace: true });
		}
	}, [navigate]);

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		switch (name) {
			case "resetCode":
				setResetCode(value);
				break;
			case "password":
				setNewPassword(value);
				break;
			default:
				break;
		}
	};

	return (
		<Box p="6" rounded="md" boxShadow="lg">
			<VStack spacing="6">
				<Heading size="lg">{t("user.password_recovery")}</Heading>
				<form onSubmit={handleSubmit}>
					<VStack spacing="4">
						<FormControl isInvalid={Boolean(error?.message)}>
							<PasswordInput
								onChange={handleInputChange}
								value={newPassword}
								onClick={handleClick}
								show={show}
							/>
							<FormErrorMessage>{error?.message}</FormErrorMessage>
						</FormControl>
						<FormControl isInvalid={Boolean(error?.message)}>
							<FormInput
								type="text"
								placeholder={t("user.email_code")}
								onChange={handleInputChange}
								value={resetCode}
								name="resetCode"
							/>
							<FormErrorMessage>{error?.message}</FormErrorMessage>
						</FormControl>
						<Button colorScheme="blue" type="submit" disabled={isSubmitting}>
							{isSubmitting ? t("user.submitting") : t("user.save")}
						</Button>
					</VStack>
				</form>
				<Text>
					{t("user.remember_password")}
					<Link to="/login">
						<Text as="span" pl="2" color="blue.500">
							{t("user.login")}
						</Text>
					</Link>
				</Text>
			</VStack>
		</Box>
	);
};

export default ResetPassword;
