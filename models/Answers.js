import mongoose from "mongoose";

// Creating a answerSchema
const answerSchema = new mongoose.Schema({
  question_id: {
    //Having the question_id as ref for linking with the respective questions
    type: mongoose.Schema.Types.ObjectId,
    ref: "Questions",
  },
  answers: String,
  created_at: {
    type: Date,
    default: Date.now(),
  },
  user: Object,
  comment_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comments",
  },
});

export default mongoose.model("Answers", answerSchema);