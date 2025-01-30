import meetingModel from './meeting.model.js'

const createNewMeeting = async (room_id, request, response) => {
  const body = request.body;

  const newMeeting = {
    room_id: room_id,
    name: body.name,
    note: body.note
  }

  try {
    const meeting = await meetingModel(newMeeting).save();

    //  If There are Users in Body, Users also should be save
  } catch (error) {
    console.log('Error in create new Meeting: ', error);
    return response.status(401).json({ message : error })
  }
};

const finishMeeting = async (meeting_id, request, response) => {
  try {
    const meeting = await meetingModel.findById(meeting_id);

    if (!meeting) return response.status(401).json({ message: 'Meeting Not found' });

    await meetingModel.updateOne({ _id: meeting._id }, { $set: { end_time: Date.now(), note: request.body.note } });
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: error });
  }
}

export default {
  createNewMeeting,
  finishMeeting
}