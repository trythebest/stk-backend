import express from "express";
import Questions from "../models/Questions.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { q } = req.query; // Getting the search query from URL params

  await Questions.aggregate([
    // Created an index in mongoDB and taken the search syntax from mongoDB
    {
      $search: {
        index: "default",
        text: {
          query: q, // matching the query word with the entire question collections
          path: {
            wildcard: "*",
          },
        },
      },
    },
    {
      $lookup: {
        from: "answers",
        let: { question_id: "$_id" },
        pipeline: [
          { $match: { $expr: { $eq: ["$question_id", "$$question_id"] } } },
          { $project: { _id: 1, user: 1 } },
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

export default router;