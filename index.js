import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import QuestionRoute from "./routes/QuestionRoute.js";
import AnswerRoute from "./routes/AnswerRoute.js";
import CommentRoute from "./routes/CommentRoute.js";
import VoteRoute from "./routes/VoteRoute.js";
import UserRoute from "./routes/UserRoute.js";
import SearchRoute from "./routes/SearchRoute.js";

dotenv.config(); // Configuration of .env file

//Server Setup
const app = express(); // express initialization
const PORT = process.env.PORT; // assigning a port for server

// Database Setup
const url = process.env.MONGO_URL; // Getting the mongo URL from the .env file
mongoose //connecting the mongoose as mongoDB
  .connect(url, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));

//Middlewares
app.use(cors()); // Adding cors for cross platform configuration
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // parses incoming JSON responses to Object

//Routes
app.get("/", (req, res) => {
  res.send("Stackover flow Backend is running");
});

app.use("/users", UserRoute);
app.use("/question", QuestionRoute);
app.use("/answer", AnswerRoute);
app.use("/comment", CommentRoute);
app.use("/vote", VoteRoute);
app.use("/search", SearchRoute);

// Server Listening
app.listen(PORT, () => {
  console.log(`Server is running on PORT : ${PORT}`);
});