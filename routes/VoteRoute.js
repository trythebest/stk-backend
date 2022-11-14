import express from "express";
import mongoose from "mongoose";
import VoteQues from "../models/voteCountQues.js";
import VoteAns from "../models/voteCountAns.js";

const router = express.Router();

router.post("/question/:id", (req, res) => {
  try {
    const { id } = req.params; // Getting the current question id from the URL params
    const { user } = req.body; //  Getting the current user

    VoteQues.find({ question_id: id }, (err, found) => {
      // Filtering the question by question id received
      if (err) throw err;

      if (found) {
        // if question was found checking whether the user is already voted
        const voteCheck = found.some((vote) => user.name == vote.user.name);

        if (voteCheck) {
          // If voted already returning a message to client
          return res.status(200).send({ message: "Already Voted" });
        } else {
          // If not voted, adding the user to the voteQuestion DB and returning a message to client
          const newEntry = new VoteQues({
            question_id: id,
            user: user,
          });
          newEntry.save();
          return res.status(201).send({ message: "Voted Success" });
        }
      } else {
        // if the question itself is not found adding the new entry
        const newEntry = new VoteQues({
          question_id: id,
          user: user,
        });
        newEntry.save();
        return res.status(201).send({ message: "Voted Success" });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/answer/:id", (req, res) => {
  try {
    const { id } = req.params; //  Getting the current answer id
    const { user, question_id } = req.body; // Getting the current user and question id

    VoteAns.find({ answer_id: id }, (err, found) => {
      // Filtering the answer list by answer id
      if (found) {
        // if answer was found checking whether the user is already voted
        const voteCheck = found.some((vote) => user.name == vote.user.name);

        if (voteCheck) {
          // If voted already returning a message to client
          return res.status(200).send({ message: "Already Voted" });
        } else {
          // If not voted, adding the user to the voteQuestion DB and returning a message to client

          const newEntry = new VoteAns({
            answer_id: id,
            question_id: question_id,
            user: user,
          });
          newEntry.save();
          return res.status(201).send({ message: "Voted Success" });
        }
      } else {
        // if the answer itself is not found adding the new entry
        const newEntry = new VoteAns({
          answer_id: id,
          question_id: question_id,
          user: user,
        });
        newEntry.save();
        return res.status(201).send({ message: "Voted Success" });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

export default router;