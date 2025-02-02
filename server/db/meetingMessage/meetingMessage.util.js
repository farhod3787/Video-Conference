import meetingMessageModel from "./meetingMessage.model.js";

const createNewMeetingMessage = async (request, response) => {
  const newMeetingMessage = {
    meeting_id: request.body.meeting_id,
    user_id: request.body.user_id,
    message: request.body.message
  };

  try {
    const meetingMessage = await meetingMessageModel(newMeetingMessage).save();
  } catch (error) {
    console.log("Error in create new Meeting Message: ", error);
    response.status(401).json({ message: error });
  }
};

export default {
  createNewMeetingMessage
};