import mongoose from "mongoose";

const dbInitialization = async () => {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("🤝 DB connected successfully."))
    .catch((error) => console.error("❌ Error in connected to DB.", error));
};

export default dbInitialization;
