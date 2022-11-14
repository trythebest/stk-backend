import mongoose from "mongoose";

// Creating a VoteCount schema for questions
const voteCountSchema = new mongoose.Schema({
  question_id: {
    //Having the question_id as ref for linking with the respective questions
    type: mongoose.Schema.Types.ObjectId,
    ref: "Questions",
  },
  user: Object,
});

const VoteQues = mongoose.model("VoteCountQuestion", voteCountSchema);

export default VoteQues;