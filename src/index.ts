import { config } from "dotenv";
config();
import mongoose from "mongoose";
import { app } from "./App";

const PORT = process.env.PORT;

mongoose
	.connect(process.env.MONGO_URL!)
	.then(() => {
		console.log(`Listening on port ${PORT}`);
		console.log("New clog");

		app.listen(PORT);
	})
	.catch((error) => {
		"connection failed due to error: " + error.message;
	});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongoDB connection error"));
