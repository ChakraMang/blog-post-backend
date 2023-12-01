import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import router from "./Routes/Routes.js";
const app = express();

dotenv.config();

const PORT = process.env.PORT || 5000;
const mongodbUrl = process.env.MONGO_DB_URL;
// Connect to MongoDB (replace with your actual MongoDB connection string)
mongoose.connect(`${mongodbUrl}/Blog-Post`).then(() => console.log("MongoDB is connected")).catch( err => console.log(err)) ;

app.use(express.json());

app.use(cors());
app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`);
});
