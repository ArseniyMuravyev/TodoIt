import {
	Modal as BaseModal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
} from "@chakra-ui/react";
import { FC, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface IModal {
	children: ReactNode;
	title?: string;
	handleClose?: () => void;
}

export const Modal: FC<IModal> = ({ children, title, handleClose }) => {
	const navigate = useNavigate();

	const onClose = () => {
		navigate(-1);
	};

	return (
		<BaseModal
			isCentered
			isOpen={true}
			onClose={handleClose ?? onClose}
			size="xl"
		>
			<ModalOverlay />
			<ModalContent minH="240" w="100%" data-cy="modal">
				<ModalHeader textAlign="center">{title}</ModalHeader>
				<ModalCloseButton data-cy="modal-close-button" />
				<ModalBody>{children}</ModalBody>
			</ModalContent>
		</BaseModal>
	);
};
