import { Box, Button, Heading, Input, Text, VStack } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { PasswordInput } from "../components/PasswordInput";
import { resetPassword } from "../features/user/actions";
import { useToast } from "../hooks/useToast";
import { useDispatch } from "../store/store";

interface IFormInput {
	email: string;
	newPassword: string;
	resetCode: string;
}

const ResetPassword: FC = () => {
	const navigate = useNavigate();
	const [show, setShow] = useState(false);
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const { showSuccess, showError } = useToast();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<IFormInput>({});

	const onClick = () => setShow((prev) => !prev);

	const onSubmit: SubmitHandler<IFormInput> = (data) => {
		if (isSubmitting) {
			return;
		}
		data.email = localStorage.getItem("resetEmail")!;


		try {
			dispatch(resetPassword(data))
				.unwrap()
				.then(() => {
					localStorage.removeItem("resetEmail");
					showSuccess(t("success.reset"));
					navigate("/login");
				});
		} catch (error) {
			showError(t("error.reset"));
		}
	};

	useEffect(() => {
		if (!localStorage.getItem("resetEmail")) {
			navigate("/forgot-password", { replace: true });
		}
	}, [navigate]);

	return (
		<Box p="6" rounded="md" boxShadow="lg">
			<VStack spacing="6">
				<Heading size="lg">{t("user.password_recovery")}</Heading>
				<form onSubmit={handleSubmit(onSubmit)}>
					<VStack spacing="4" w="50vw">
						<PasswordInput
							onClick={onClick}
							show={show}
							register={register}
							errors={errors}
							type="newPassword"
						/>
						<Input
							type="text"
							placeholder={t("user.email_code")}
							{...register("resetCode", { required: "Неправильный код" })}
						/>
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
