import { TUser } from "@arseniy/types";
import { Button, Flex, Heading, Input, Text, VStack } from "@chakra-ui/react";
import { ChangeEvent, FC, SyntheticEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import defaultProfileImage from "../assets/images/profile.jpg";
import { Modal } from "../components/modal/Modal";
import { ProfileButtos } from "../components/profile-page/ProfileButtons";
import { ProfileImagePicker } from "../components/profile-page/ProfileImagePicker";
import { IConfirmDeletion } from "../components/todo-page/TodoInfo";
import {
	deleteAvatar,
	deleteUser,
	logout,
	updateUser,
	uploadAvatar,
} from "../features/user/actions";
import { useToast } from "../hooks/useToast";
import { useDispatch, useSelector } from "../store/store";
import { Section, responsiveWidths } from "../styles";

export interface IFormInput {
	name: string;
	file: File;
}

const Profile: FC = () => {
	const dispatch = useDispatch();
	const { id, name, isActivated, avatarName } = useSelector(
		(state) => state.user.user as TUser
	);

	const { showSuccess, showError } = useToast();
	const { t } = useTranslation();
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

	const profilePicture = avatarName
		? `http://localhost:5000/${avatarName}`
		: defaultProfileImage;

	const {
		register,
		handleSubmit,
		reset,
		formState: { isDirty },
	} = useForm<IFormInput>({
		defaultValues: {
			name,
			file: undefined,
		},
		mode: "onChange",
	});

	const onSubmit: SubmitHandler<IFormInput> = (data) => {
		const { name } = data;
		dispatch(updateUser({ id, name }))
			.unwrap()
			.then(() => {
				showSuccess(t("success.profile"));
			})
			.catch(() => {
				showError(t("error.profile"));
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
		dispatch(deleteUser(id));
		setIsDeleteModalOpen(false);
		showSuccess(t("success.delete"));
	};

	const handleOpenModal = () => {
		setIsDeleteModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsDeleteModalOpen(false);
	};

	const handlePictureUpdate = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			dispatch(uploadAvatar({ id, file }));
		}
	};

	return (
		<Section delay={0.2}>
			<Heading as="h1" textAlign="center">
				{t("user.profile")}
			</Heading>
			<Flex justifyContent="center">
				<VStack
					as="form"
					spacing="4"
					onSubmit={handleSubmit(onSubmit)}
					mt="8"
					w={responsiveWidths}
				>
					<ProfileImagePicker
						register={register}
						profilePicture={profilePicture}
						onChangePicture={handlePictureUpdate}
					/>
					<Input
						type="text"
						placeholder={t("user.name")}
						{...register("name", { required: true })}
					/>
					<Text fontSize="md" textAlign="center">
						{isActivated ? t("user.activated") : t("user.not-activated")}
					</Text>
					{avatarName && (
						<Button
							colorScheme="red"
							onClick={() => dispatch(deleteAvatar(id))}
						>
							{t("user.delete_avatar")}
						</Button>
					)}

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
						<ConfirmUserDeletionModal
							handleDelete={handleDelete}
							handleCloseModal={handleCloseModal}
						/>
					)}
				</VStack>
			</Flex>
		</Section>
	);
};

const ConfirmUserDeletionModal: FC<IConfirmDeletion> = ({
	handleDelete,
	handleCloseModal,
}) => {
	const { t } = useTranslation();
	return (
		<Modal title={t("modal.user_title")} handleClose={handleCloseModal}>
			<Flex alignItems="center" justifyContent="center" mt="20" gap="8">
				<Button colorScheme="red" onClick={handleDelete} w="24">
					{t("modal.delete")}
				</Button>
				<Button onClick={handleCloseModal} w="24">
					{t("user.cancel")}
				</Button>
			</Flex>
		</Modal>
	);
};

export default Profile;
