import { ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "../../store/store";
import { Preloader } from "../common/Preloader";

type ProtectedRouteProps = {
	onlyUnAuth?: boolean;
	children: ReactElement;
};

export const ProtectedRoute = ({
	children,
	onlyUnAuth,
}: ProtectedRouteProps) => {
	const loading = useSelector((state) => state.user.loading);
	const user = useSelector((state) => state.user.user);
	const location = useLocation();

	if (loading) {
		return <Preloader />;
	}

	if (!onlyUnAuth && !user) {
		return <Navigate replace to="/login" />;
	}

	if (onlyUnAuth && user) {
		const from = location.state?.from || { pathname: "/" };

		return <Navigate replace to={from} />;
	}

	return children;
};
