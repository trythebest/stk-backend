import mongoose from "mongoose";

// Creating a VoteCount schema for answers
const voteCountSchema = new mongoose.Schema({
  answer_id: {
    // having the answer id for linking it with respective answer
    type: mongoose.Schema.Types.ObjectId,
    ref: "Answers",
  },
  question_id: {
    //Having the question_id as ref for linking with the respective questions
    type: mongoose.Schema.Types.ObjectId,
    ref: "Questions",
  },
  user: Object,
});

const VoteAns = mongoose.model("VoteCountAnswer", voteCountSchema);

export default VoteAns;