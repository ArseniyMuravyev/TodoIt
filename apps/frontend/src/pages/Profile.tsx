import { TUser } from "@arseniy/types";
import { Button, Flex, Input, Text, VStack } from "@chakra-ui/react";
import { FC, SyntheticEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Modal } from "../components/Modal";
import { ProfileButtos } from "../components/ProfileButtons";
import { IConfirmDeletion } from "../components/TodoInfo";
import { deleteUser, logout, updateUser } from "../features/user/actions";
import { useToast } from "../hooks/useToast";
import { useDispatch, useSelector } from "../store/store";

interface IFormInput {
	name: string;
}

const Profile: FC = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user.user as TUser);

	const { id, name } = user || { id: "", name: "" };
	const { showSuccess, showError } = useToast();
	const { t } = useTranslation();
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

	const {
		register,
		handleSubmit,
		reset,
		formState: { isDirty },
	} = useForm<IFormInput>({
		defaultValues: {
			name,
		},
		mode: "onChange",
	});

	const onSubmit: SubmitHandler<IFormInput> = (data) => {
		if (!isDirty) return;

		if (!id) {
			showError(t("error.id"));
			return;
		}

		if (!data.name) {
			showError(t("error.empty"));
			return;
		}

		dispatch(updateUser({ id, name: data.name }))
			.unwrap()
			.then(() => {
				showSuccess(t("success.profile"));
			})
			.catch((error) => {
				showError(error.message || t("error.profile"));
			});
	};

	const handleLogout = () => {
		dispatch(logout());
		showSuccess(t("success.logout"));
	};

	const handleCancel = (e: SyntheticEvent) => {
		e.preventDefault();
		reset({
			name: name,
		});
	};

	const handleDelete = () => {
		dispatch(deleteUser(user?.id));
		setIsDeleteModalOpen(false);
		showSuccess(t("success.delete"));
	};

	const handleOpenModal = () => {
		setIsDeleteModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsDeleteModalOpen(false);
	};

	return (
		<Flex justifyContent="center">
			<VStack
				as="form"
				spacing="4"
				onSubmit={handleSubmit(onSubmit)}
				mt="8"
				w={{ base: "80vw", md: "50vw" }}
			>
				<Input
					type="text"
					placeholder={t("user.name")}
					{...register("name", { required: true })}
				/>
				<Text fontSize="md" textAlign="center">
					{user?.isActivated ? t("user.activated") : t("user.not-activated")}
				</Text>

				{isDirty && <ProfileButtos handleCancel={handleCancel} />}
				<Flex gap="4">
					<Button
						variant="link"
						colorScheme="blue"
						onClick={handleLogout}
						w="32"
					>
						{t("user.logout")}
					</Button>
					<Button
						variant="link"
						colorScheme="red"
						onClick={handleOpenModal}
						w="32"
					>
						{t("user.delete")}
					</Button>
				</Flex>
				{isDeleteModalOpen && (
					<Modal title={t("modal.user_title")} handleClose={handleCloseModal}>
						<ConfirmUserDeletion
							handleDelete={handleDelete}
							handleCloseModal={handleCloseModal}
						/>
					</Modal>
				)}
			</VStack>
		</Flex>
	);
};

const ConfirmUserDeletion: FC<IConfirmDeletion> = ({
	handleDelete,
	handleCloseModal,
}) => {
	const { t } = useTranslation();
	return (
		<Flex alignItems="center" justifyContent="center" mt="20" gap="8">
			<Button colorScheme="red" onClick={handleDelete} w="24">
				{t("modal.delete")}
			</Button>
			<Button onClick={handleCloseModal} w="24">
				{t("user.cancel")}
			</Button>
		</Flex>
	);
};

export default Profile;
