import { Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { ChangeEvent, FC, SyntheticEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { FormInput } from "../components/FormInput";
import { forgotPassword } from "../features/user/actions";
import { useToast } from "../hooks/useToast";
import { useDispatch } from "../store/store";

const ForgotPassword: FC = () => {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const { showSuccess } = useToast();
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (e: SyntheticEvent) => {
		e.preventDefault();
		if (isSubmitting) {
			return;
		}
		setIsSubmitting(true);
		await dispatch(forgotPassword({ email })).unwrap();
		localStorage.setItem("resetEmail", email);
		showSuccess(t("success.reset"));
		navigate("/reset-password", { replace: true });

		setIsSubmitting(false);
	};

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>
		setEmail(e.target.value);

	return (
		<Flex justifyContent="center" align="center" p="6">
			<VStack w="100%" spacing="6">
				<Heading as="h1" pb="6">
					{t("user.password_recovery")}
				</Heading>
				<form onSubmit={handleSubmit}>
					<VStack spacing="4">
						<FormInput
							name="email"
							type="email"
							placeholder="Email"
							onChange={handleInputChange}
							value={email}
						/>
						<Button
							colorScheme="blue"
							size="md"
							type="submit"
							w="50vw"
							disabled={isSubmitting}
						>
							{isSubmitting ? t("user.submitting") : t("user.reset")}
						</Button>
					</VStack>
				</form>
				<Flex mt="2" gap="2">
					{t("user.remember_password")}
					<Link to="/login">
						<Text as="span" ml="2" color="blue.500">
							{t("user.login")}
						</Text>
					</Link>
				</Flex>
			</VStack>
		</Flex>
	);
};

export default ForgotPassword;
