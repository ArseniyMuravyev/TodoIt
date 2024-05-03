import { Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { ChangeEvent, FC, SyntheticEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { FormInput } from "../components/FormInput";
import { PasswordInput } from "../components/PasswordInput";
import { register } from "../features/user/actions";
import { useToast } from "../hooks/useToast";
import { useDispatch } from "../store/store";

const Register: FC = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const [show, setShow] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { showSuccess } = useToast();

	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		if (isSubmitting) {
			return;
		}
		setIsSubmitting(true);
		dispatch(
			register({
				name: name,
				email: email,
				password: password,
			})
		)
			.unwrap()
			.then(() => showSuccess(t("user.activation")));
		setIsSubmitting(false);
	};

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		switch (name) {
			case "email":
				setEmail(value);
				break;
			case "password":
				setPassword(value);
				break;
			case "name":
				setName(value);
				break;
			default:
				break;
		}
	};

	const handleClick = () => setShow((prev) => !prev);

	return (
		<Flex justifyContent="center" alignContent="center" p="6">
			<VStack spacing="6" w="100%">
				<Heading as="h3" pb="6">
					{t("user.registration")}
				</Heading>
				<form name="register" onSubmit={handleSubmit}>
					<VStack spacing="4">
						<FormInput
							type="text"
							placeholder={t("user.name")}
							onChange={handleInputChange}
							value={name}
							name="name"
						/>
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
							onClick={handleClick}
							show={show}
						/>
						<Button
							colorScheme="blue"
							type="submit"
							w="50vw"
							disabled={isSubmitting}
						>
							{isSubmitting ? t("user.submitting") : t("user.signUp")}
						</Button>
					</VStack>
				</form>
				<Flex mt="2" gap="2">
					{t("user.already_registered")}
					<Link to="/login">
						<Text color="blue.500">{t("user.login")}</Text>
					</Link>
				</Flex>
			</VStack>
		</Flex>
	);
};

export default Register;
