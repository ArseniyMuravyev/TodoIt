import { Button } from "@chakra-ui/react";
import { t } from "i18next";
import { FC } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "../../../store/store";

interface ISearchButton {
	handleClick: () => void;
}

export const SearchButton: FC<ISearchButton> = ({ handleClick }) => {
	const user = useSelector((state) => state.user.user);
	return (
		<NavLink to={user ? "/todos/search" : "/login"}>
			<Button
				variant="link"
				_hover={{ textDecoration: "none" }}
				color="none"
				fontWeight="400"
				onClick={handleClick}
			>
				{t("search.search")}
			</Button>
		</NavLink>
	);
};
