import express from 'express';
import roomModel from './room.model.js'
import meetingUtil from '../meeting/meeting.util.js'

const router = express.Router();

router.post('/', auth.authenticate,  async function (request, response) {
  try {
    const room = {
      ...request.body,
      author: request.user.id
    }

    await new roomModel(room).save();

    response.status(200).json({message: "Room Saved"})
  } catch (error) {
    console.log(error);
    response.status(404).json({message: "Error in Saved Company"})
  }
});

router.get('/', auth.authenticate, async (request, response) => {
  try {
    const rooms = await roomModel.find().populate('author', 'name');

    const roomsData = rooms.map(room => ({
      id: room._id,
      name: room.name,
      author: room.author?.name || null,
      created_time: room.created_time,
      closed_time: room.closed_time,
      planned_time: room.closed_time,
      code: room.code,
      note: room.note,
      state: room.state
    }));

    response.status(200).json(roomsData);
  } catch (error) {
    console.error('Error fetching rooms:', error);
    response.status(500).json({ message: 'Failed to get all companies', error: error.message });
  }
});

router.get('/:id', auth.authenticate, async (request, response) => {
  const { id } = request.params;

  try {
    const room = await roomModel.findById(id).populate('author', 'name');

    if (!room) {
      return response.status(404).json({ message: 'Company not found' });
    }

    const roomData = {
      id: room._id,
      name: room.name,
      author: room.author?.name || null,
      created_time: room.created_time,
      closed_time: room.closed_time,
      planned_time: room.closed_time,
      code: room.code,
      note: room.note,
      state: room.state
    }

    response.status(200).json(roomData);
  } catch (error) {
    console.error('Error fetching room:', error);
    response.status(500).json({ message: 'Failed to get some room', error: error.message });
  }
});

router.put('/:id', auth.authenticate, async (request, response) => {
  const { id } = request.params;
  const newData = request.body;

  try {
    const room = await roomModel.findById(id)

    if (!room) return response.status(401).json({ message: 'Room not found'});

    if (room.author != request.user.id) return response.status(401).json({ message: 'No Access to update this room'});

    await roomModel.updateOne({ _id: room._id }, { $set: newData });

    response.status(200).json({ message: 'Company updated', data: company });
  } catch (error) {
    console.error('Error fetching room:', error);
    response.status(500).json({ message: 'Failed to update room', error: error.message });
  }
});

router.post('close/:id', auth.authenticate, async (request, response) => {
  const { id } = request.params;
  try {
    await roomModel.findByIdAndUpdate(id, { closed_time: new Date.now() })
    response.status(200).json({ message: 'Room Closed' })
  } catch (error) {
    console.error('Error fetching close room:', error);
    response.status(500).json({ message: 'Failed to close room', error: error.message });
  }
});

router.post('start/:id', auth.authenticate, async (request, response) => {
  const { id } = request.params;
  try {
    const room = await roomModel.findById(id);

    if (!room) return response.status(401).json({ message: 'Room Not found'})

    await meetingUtil.createNewMeeting(room._id, request, response);

    response.status(200).json({ message: 'Create new Meeting'});
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: error });
  }
});

router.post('finish/:meeting_id', auth.authenticate, async (request, response) => {
  const { meeting_id } = request.params;

  try {
    await meetingUtil.finishMeeting(meeting_id, request, response);

    response.status(200).json({ message: 'Success Finish' });
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: error })
  }
});


export default router;