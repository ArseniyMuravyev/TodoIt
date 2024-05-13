import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import fileUpload from "express-fileupload";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import { connectDB } from "./config/db";
import { errorMiddleware } from "./middlewares/error-middleware";
import { router as authRoute } from "./routes/auth-route";
import { router as todoRoute } from "./routes/todo-route";
import { router as userRoute } from "./routes/user-route";

export const accessSecret = process.env.JWT_ACCESS_SECRET || "";
export const refreshSecret = process.env.JWT_REFRESH_SECRET || "";

const swaggerDocument = YAML.load("./swagger.yml");

const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;

const app = express();

app.use(fileUpload());
app.use(
	cors({
		credentials: true,
		origin: process.env.CLIENT_URL,
	})
);
app.use(express.json());
app.use(express.static("static"));
app.use(cookieParser());

app.use("/todos", todoRoute);
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(errorMiddleware);

app.listen(PORT, ( ) => {
	connectDB();
});
