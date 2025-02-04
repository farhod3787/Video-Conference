import mongoose from "mongoose";

const translationsSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  text_uz: {
    type: String
  },
  text_ru: {
    type: String
  },
  text_en: {
    type: String
  }
});

const translationModel = mongoose.model('translations', translationsSchema);

export default translationModel;

