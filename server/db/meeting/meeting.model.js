import mongoose from "mongoose";

const meetingsSchema = new mongoose.Schema({
  room_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'rooms',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  start_time: {
    type: Date,
    required: true,
    default: Date.now
  },
  end_time: {
    type: Date
  },
  note: {
    type: String
  },
  file_sha : {
    type: String
  }
});

const meetingModel = mongoose.model('meetings', meetingsSchema);

export default meetingModel;