import express from "express";
import CommentDB from "../models/Comments.js"; //Getting the commentDB

const router = express.Router(); //Handling with express router

router.post("/:id", async (req, res) => {
  try {
    const { id } = req.params; // Getting the current question id from the URL params
    const { comment, user } = req.body; // Getting the comment and user details from the frontend

    await CommentDB.create({
      // Adding the comment data to database
      question_id: id,
      comment: comment,
      user: user,
    })
      .then((response) => {
        res.status(201).send({ message: "Comment added successfully" });
      })
      .catch((err) => {
        res.status(400).send({ message: "Cannot add your comment" });
      });
  } catch (error) {
    res.status(400).send({ message: "Cannot add your comment" });
  }
});

export default router;