import mongoose from "mongoose";

mongoose.set("returnOriginal", false);

mongoose.connect(process.env.MONGODB_URI).catch((err) => {
  console.log(`Error connection to MongoDB: ${err.message}`);
});

mongoose.connection.on("disconnected", () => {
  console.log("Disconnected from MongoDB!");
});

mongoose.connection.on("error", (err) => {
  console.log(`MongoDB connection error: ${err.message}`);
});

export default mongoose.connection;
