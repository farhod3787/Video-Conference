import mongoose from "mongoose";

const roomsSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'companyUsers',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  created_time: {
    type: Date,
    required: true,
    default: Date.now
  },
  closed_time: {
    type: Date
  },
  planned_time: {
    type: Date,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  note: {
    type: String
  },
  state: {
    type: String,
    required: true
  }
});

const roomModel = mongoose.model('rooms', roomsSchema);

export default roomModel;