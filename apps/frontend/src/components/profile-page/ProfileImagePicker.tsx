import { Avatar, Box, Input } from "@chakra-ui/react";
import { ChangeEvent, FC, useRef } from "react";
import { UseFormRegister } from "react-hook-form";

import { IFormInput } from "../pages/Profile";

interface IProfileImagePicker {
	register: UseFormRegister<IFormInput>;
	profilePicture: string;
	onChangePicture: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const ProfileImagePicker: FC<IProfileImagePicker> = ({
	register,
	profilePicture,
	onChangePicture,
}) => {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const handleImageClick = () => {
		fileInputRef.current?.click();
	};

	return (
		<Box
			cursor="pointer"
			onClick={handleImageClick}
			_hover={{ opacity: 0.4 }}
			transition="opacity 0.2s ease-in-out"
		>
			<Avatar boxSize="100px" src={profilePicture} />

			<Input
				type="file"
				accept="image/*"
				hidden
				{...register("file", {
					onChange: (e) => onChangePicture(e),
				})}
				ref={fileInputRef}
			/>
		</Box>
	);
};
