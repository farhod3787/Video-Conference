import express from 'express';
import systemUserModel from './systemUser.model.js';

const router = express.Router();

router.post('/', async function (request, response, next) {
  try {
    const systemUser = {
      ...request.body
    }

    await new systemUserModel(systemUser).save();
    response.status(200).json({message: "System User Saved"})
  } catch (error) {
    console.log(error);
    response.status(404).json({message: "Error in Saved Company"})
  }
});

export default router;