import express from "express";
import AnswerDB from "../models/Answers.js"; // Getting the AnswerDB

const router = express.Router(); //Handling with express router

router.post("/:id", async (req, res) => {
  const { answers, user } = req.body; // Getting the answer and user details from the frontend

  const { id } = req.params; // Getting the current question id from the URL params

  const answerData = new AnswerDB({
    // Creating the answer object
    question_id: id,
    answers: answers,
    user: user,
  });

  // Adding it to the database
  await answerData
    .save()
    .then((response) =>
      res
        .status(201)
        .send({ message: "Your answer has been added successfully" })
    )
    .catch((err) =>
      res.status(400).send({ message: "Unable to add your answer" })
    );
});

export default router;