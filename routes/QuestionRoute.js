import express from "express";
import mongoose from "mongoose";
import QuestionDB from "../models/Questions.js"; // Getting the QuestionDB

const router = express.Router(); //Handling with express router

router.post("/", async (req, res) => {
  const { title, body, tags, user } = req.body; // Getting all the data from frontEnd
  const questionData = new QuestionDB({
    // Creating a new question
    title: title,
    body: body,
    tags: tags,
    user: user,
  });
  // Sending it to the database
  await questionData
    .save()
    .then((response) => {
      res.status(201).send(response);
    })
    .catch((err) => {
      res
        .status(400)
        .send({ message: "Problem in adding question,Please try later" });
    });
});

router.get("/", async (req, res) => {
  //GET request for all questions
  await QuestionDB.aggregate([
    // Creating a aggregate method for combining the answers,comments and voteDetails based on mongoDB methods
    {
      $lookup: {
        from: "answers", // assigning a lookup  method on answers collection
        // localField: "_id",
        // foreignField: "question_id",
        let: { question_id: "$_id" }, // assigning the question id as id
        pipeline: [
          { $match: { $expr: { $eq: ["$question_id", "$$question_id"] } } }, // matching the question id with the respective cells question id
          { $project: { _id: 1, user: 1 } }, // Displaying only the id and user by inclusion method
        ],
        as: "answers",
      },
    },
    {
      $lookup: {
        from: "comments",
        let: { question_id: "$_id" },
        pipeline: [
          { $match: { $expr: { $eq: ["$question_id", "$$question_id"] } } },
          { $project: { _id: 1, user: 1, created_at: 1, comment: 1 } },
        ],
        as: "comments",
      },
    },
    {
      $lookup: {
        from: "votecountquestions",
        let: { question_id: "$_id" },
        pipeline: [
          { $match: { $expr: { $eq: ["$question_id", "$$question_id"] } } },
          { $project: { _id: 1 } },
        ],
        as: "voteQues",
      },
    },
  ])
    .exec()
    .then((response) => res.status(200).send(response))
    .catch((err) => res.status(404).send(err));
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  await QuestionDB.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(id) } },
    {
      $lookup: {
        from: "answers",
        // localField: "_id",
        // foreignField: "question_id",
        let: { question_id: "$_id" },
        pipeline: [
          { $match: { $expr: { $eq: ["$question_id", "$$question_id"] } } },
          { $project: { question_id: 0, __v: 0 } },
        ],
        as: "answers",
      },
    },
    {
      $lookup: {
        from: "comments",
        let: { question_id: "$_id" },
        pipeline: [
          { $match: { $expr: { $eq: ["$question_id", "$$question_id"] } } },
          { $project: { question_id: 0, __v: 0 } },
        ],
        as: "comments",
      },
    },
    {
      $lookup: {
        from: "votecountquestions",
        let: { question_id: "$_id" },
        pipeline: [
          { $match: { $expr: { $eq: ["$question_id", "$$question_id"] } } },
          { $project: { _id: 1 } },
        ],
        as: "voteQues",
      },
    },
    {
      $lookup: {
        from: "votecountanswers",
        let: { question_id: "$_id" },
        pipeline: [
          { $match: { $expr: { $eq: ["$question_id", "$$question_id"] } } },
          { $project: { _id: 1, answer_id: 1 } },
        ],
        as: "voteAns",
      },
    },
  ])
    .exec()
    .then((response) => res.status(200).send(response))
    .catch((err) => res.status(404).send(err));
});

export default router;