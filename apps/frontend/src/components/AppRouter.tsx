import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { App } from "../app";
import Home from "../pages/Home";
import { Modal } from "./Modal";
import { Preloader } from "./Preloader";
import { ProtectedRoute } from "./ProtectedRoute";
import { TodoInfo } from "./TodoInfo";

const ErrorPage = lazy(() => import("../pages/ErrorPage"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const ResetPassword = lazy(() => import("../pages/ResetPassword"));
const Todos = lazy(() => import("../pages/Todos"));
const ForgotPassword = lazy(() => import("../pages/ForgotPassword"));
const Profile = lazy(() => import("../pages/Profile"));

export const router = createBrowserRouter([
	{
		element: (
			<Suspense fallback={<Preloader />}>
				<App />,
			</Suspense>
		),
		errorElement: (
			<Suspense fallback={<Preloader />}>
				<ErrorPage />
			</Suspense>
		),
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/register",
				element: (
					<Suspense fallback={<Preloader />}>
						<ProtectedRoute onlyUnAuth>
							<Register />
						</ProtectedRoute>
					</Suspense>
				),
			},
			{
				path: "/profile",
				element: (
					<Suspense fallback={<Preloader />}>
						<ProtectedRoute>
							<Profile />
						</ProtectedRoute>
					</Suspense>
				),
			},
			{
				path: "/login",
				element: (
					<Suspense fallback={<Preloader />}>
						<ProtectedRoute onlyUnAuth>
							<Login />
						</ProtectedRoute>
					</Suspense>
				),
			},
			{
				path: "/forgot-password",
				element: (
					<Suspense fallback={<Preloader />}>
						<ProtectedRoute onlyUnAuth>
							<ForgotPassword />
						</ProtectedRoute>
					</Suspense>
				),
			},
			{
				path: "/reset-password",
				element: (
					<Suspense fallback={<Preloader />}>
						<ProtectedRoute onlyUnAuth>
							<ResetPassword />
						</ProtectedRoute>
					</Suspense>
				),
			},
			{
				path: "todos",
				element: (
					<Suspense fallback={<Preloader />}>
						<ProtectedRoute>
							<Todos />
						</ProtectedRoute>
					</Suspense>
				),
				children: [
					{
						path: ":id",
						element: (
							<Modal title="Todo!">
								<TodoInfo />
							</Modal>
						),
					},
				],
			},
		],
	},
]);
