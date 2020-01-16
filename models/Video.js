import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
  // We don't have our video as bytes, we save our videos in Amazon. This is just text Database
  // We don't put actual videos on our database, because it make our database heavy.
  fileUrl: {
    type: String,
    required: "File URL is required"
  },
  title: {
    type: String,
    required: "Title is required"
  },
  description: String,
  views: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

const model = mongoose.model("Video", VideoSchema);

export default model;
