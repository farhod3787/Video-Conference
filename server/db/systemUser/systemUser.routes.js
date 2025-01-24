import express from 'express';
import systemUserModel from './systemUser.model.js';
import auth from '../middleware/auth.js';
import login from './systemUser.auth.js';

const router = express.Router();

router.post('/', async function (request, response, next) {
  try {
    const hashPassword = await auth.hashPassword(request.body.password);

    const systemUser = {
      ...request.body,
      password: hashPassword
    }

    await new systemUserModel(systemUser).save();
    response.status(200).json({message: "System User Saved"})
  } catch (error) {
    console.log(error);
    response.status(404).json({message: "Error in Saved Company"})
  }
});

router.delete('/:id', async function (request, response) {
  try {
    await systemUserModel.findByIdAndDelete(request.params.id);
    response.status(200).json({message: "System User Deleted"})
  } catch (error) {
    console.log(error);
    response.status(404).json({message: "Error in Deleted Company"})
  }
})

router.post('/login', login);

export default router;