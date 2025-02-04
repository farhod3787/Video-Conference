import express from 'express';
import auth from '../../auth.js';
import meetingModel from './meeting.model.js';
import roomModel from '../room/room.model.js';

const router = express.Router();

router.get('/:room_id', auth.authenticate, async (request, response) => {
  const { room_id } = request.params;

  try {
    const room = await roomModel.findById(room_id);

    if (!room) return response.status(401).json({ message: 'Room Not found' });

    const meetings = await meetingModel.find({ room_id: room._id });

    response.status(200).json(meetings);
  } catch (error) {
    console.error('Error fetching meetings:', error);
    response.status(500).json({ message: 'Failed to get all meetings', error: error.message });
  }
});

export default router;