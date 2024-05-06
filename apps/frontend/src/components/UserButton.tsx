import { IconButton } from "@chakra-ui/react";
import { User } from "lucide-react";
import { FC } from "react";
import { NavLink } from "react-router-dom";

interface IUserButton {
	onClick?: () => void;
}

export const UserButton: FC<IUserButton> = ({ onClick }) => {
	return (
		<NavLink to="/profile">
			<IconButton
				aria-label="User button"
				onClick={onClick}
				colorScheme="teal"
				icon={<User size="20" />}
			></IconButton>
		</NavLink>
	);
};
