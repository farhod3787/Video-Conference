import mongoose from "mongoose";

const languagesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  }
});

const languageModel = mongoose.model('languages', languagesSchema);

export default languageModel;