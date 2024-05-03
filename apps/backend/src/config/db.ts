import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI ?? "mongodb://0.0.0.0:27017/testing";

export const connectDB = async () => {
	try {
		await mongoose.connect(MONGO_URI);
	} catch (error: any) {
		console.error("Error connecting to MongoDB:", error.message);
		process.exit(1);
	}
};
