import mongoose from "mongoose";

const databaseUrl = process.env.DEV_DB_URL || "";

mongoose
  .connect(databaseUrl)
  .then(() => {
    console.log("Database connected successfully ✅");
  })
  .catch((err) => {
    console.error("Failed to connect to database❌: ", err);
  });

export default mongoose;
