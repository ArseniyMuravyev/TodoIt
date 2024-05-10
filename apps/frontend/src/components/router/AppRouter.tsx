import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { App } from "../../app";
import { Preloader } from "../common/Preloader";
import { Modal } from "../modal/Modal";
import { SearchModal } from "../modal/SearchModal";
import { TodoInfo } from "../todo-page/TodoInfo";
import { ProtectedRoute } from "./ProtectedRoute";

const Home = lazy(() => import("../../pages/Home"));
const ErrorPage = lazy(() => import("../../pages/ErrorPage"));
const Login = lazy(() => import("../../pages/Login"));
const Register = lazy(() => import("../../pages/Register"));
const ResetPassword = lazy(() => import("../../pages/ResetPassword"));
const Todos = lazy(() => import("../../pages/Todos"));
const ForgotPassword = lazy(() => import("../../pages/ForgotPassword"));
const Profile = lazy(() => import("../../pages/Profile"));

export const router = createBrowserRouter([
	{
		element: (
			<Suspense fallback={<Preloader />}>
				<App />
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
				element: (
					<Suspense fallback={<Preloader />}>
						<Home />
					</Suspense>
				),
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
							<Modal title="Todo info">
								<TodoInfo />
							</Modal>
						),
					},
					{
						path: "search",
						element: (
							<Suspense fallback={<Preloader />}>
								<ProtectedRoute>
									<SearchModal />
								</ProtectedRoute>
							</Suspense>
						),
					},
				],
			},
		],
	},
]);
