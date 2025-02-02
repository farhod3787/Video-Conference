import mongoose from "mongoose";

const meetingUsersSchema = new mongoose.Schema({
  meeting_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'meetings',
    required: true
  },
  user_id : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'companyUsers'
  },
  name: {
    type: String
  },
  enter_time: {
    type: Date,
    default: Date.now
  },
  exit_time: {
    type: Date
  }
});

const meetingUserModel = mongoose.model('meetingUsers', meetingUsersSchema);

export default meetingUserModel;