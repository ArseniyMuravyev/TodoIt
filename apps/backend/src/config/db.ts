import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI ?? "mongodb://0.0.0.0:27017/testing";

export const connectDB = async () => {
	try {
		await mongoose.connect(MONGO_URI);
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error("Error connecting to MongoDB:", error.message);
		} else {
			console.error("An unknown error occurred.");
		}
		process.exit(1);
	}
};
