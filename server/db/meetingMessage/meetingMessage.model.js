import mongoose from "mongoose";

const meetingMessagesSchema = new mongoose.Schema({
  meeting_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'meetings',
    required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'meetingUsers',
    required: true
  },
  message_time: {
    type: Date,
    required: true,
    default: Date.now
  },
  message: {
    type: String,
    required: true
  }
});

const meetingMessageModel = mongoose.model('meetingMessages', meetingMessagesSchema);

export default meetingMessageModel;