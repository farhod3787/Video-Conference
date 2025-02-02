import meetingUserModel from "./meetingUser.model";

const createNewMeetingUser = async (request, response) => {

  const newMeetingUser = {
    meeting_id: request.body.meeting_id,
    user_id: request.body.user_id,
    name: request.body.name
  };

  try {
    const meetingUser = await meetingUserModel(newMeetingUser).save();
    return meetingUser._id;
  } catch (error) {
    console.log("Error in create new Meeting User: ", error);
    response.status(401).json({ message: error });
  }
};

const finishMeetingUser = async (request, response) => {
  try {
    // request.body.user_id is the meetingUser -> _id
    const meetingUser = await meetingUserModel.findById(request.body.user_id);
    meetingUser.exit_time = Date.now();
    await meetingUser.save();
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: error });
  }
};

export default {
  createNewMeetingUser,
  finishMeetingUser
};