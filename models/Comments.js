import mongoose from "mongoose";

// Creating a comment Schema
const commentSchema = new mongoose.Schema({
  question_id: {
    //Having the question_id as ref for linking with the respective questions
    type: mongoose.Schema.Types.ObjectId,
    ref: "Questions",
  },
  comment: String,
  created_at: {
    type: Date,
    default: Date.now(),
  },
  user: Object,
});

export default mongoose.model("Comments", commentSchema);