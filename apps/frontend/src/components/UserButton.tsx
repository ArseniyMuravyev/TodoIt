import { Button } from "@chakra-ui/react";
import { User } from "lucide-react";
import { FC } from "react";
import { NavLink } from "react-router-dom";

interface IUserButton {
	onClick?: () => void;
}

export const UserButton: FC<IUserButton> = ({ onClick }) => {
	return (
		<Button onClick={onClick}>
			<NavLink to="profile">
				<User size="20" />
			</NavLink>
		</Button>
	);
};
