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

const connectDb = async () => {
  try {
    const connection = await mongoose.connect(mongodbUrl);
    console.log(connection.connection.host);
  } catch (error) {
    console.log(error);
    process.exit(1)
    
  }
}


app.use(express.json());

app.options("*", cors({ origin: 'http://localhost:3000', optionsSuccessStatus: 200 }));

app.use(cors({ origin: "http://localhost:3000", optionsSuccessStatus: 200 }));
app.use("/", router);

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on Port: ${PORT}`);
  });  
})