import { Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { ChangeEvent, FC, SyntheticEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, Navigate } from "react-router-dom";
import { FormInput } from "../components/FormInput";
import { PasswordInput } from "../components/PasswordInput";
import { login } from "../features/user/actions";
import { useToast } from "../hooks/useToast";
import { useDispatch, useSelector } from "../store/store";

const Login: FC = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();
	const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
	const { showError } = useToast();
	const { t } = useTranslation();
	const [show, setShow] = useState(false);
	const handleClick = () => setShow((prev) => !prev);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		if (isSubmitting) {
			return;
		}
		setIsSubmitting(true);
		if (!email || !password) {
			showError(t("error.empty"));
		}
		dispatch(login({ email, password }));
		setIsSubmitting(false);
	};

	if (isAuthenticated) {
		return <Navigate to={"/"} />;
	}

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		switch (name) {
			case "email":
				setEmail(value);
				break;
			case "password":
				setPassword(value);
				break;
			default:
				break;
		}
	};

	return (
		<Flex justifyContent="center" align="center" p="6">
			<VStack spacing="6" w="100%">
				<Heading as="h1" pb="6">
					{t("user.entrance")}
				</Heading>
				<form onSubmit={handleSubmit}>
					<VStack spacing="4">
						<FormInput
							type="email"
							placeholder="Email"
							onChange={handleInputChange}
							value={email}
							name="email"
						/>
						<PasswordInput
							onChange={handleInputChange}
							value={password}
							show={show}
							onClick={handleClick}
						/>
						<Button
							colorScheme="blue"
							w="full"
							type="submit"
							disabled={isSubmitting}
						>
							{isSubmitting ? t("user.submitting") : t("user.login")}
						</Button>
					</VStack>
				</form>
				<Flex
					mt="2"
					justifyContent="center"
					alignItems="center"
					gap="2"
					flexDirection="column"
				>
					<Flex gap="2">
						<Text>{t("user.new_user")}</Text>
						<Link to="/register">
							<Text color="blue.500">{t("user.signUp")}</Text>
						</Link>
					</Flex>
					<Flex gap="2">
						<Text>{t("user.forgot_password")}</Text>
						<Link to="/forgot-password">
							<Text color="blue.500">{t("user.reset_password")}</Text>
						</Link>
					</Flex>
				</Flex>
			</VStack>
		</Flex>
	);
};

export default Login;
