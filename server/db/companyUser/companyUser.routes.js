import express from 'express';
import companyUserModel from './companyUser.model.js';
import auth from '../middleware/auth.js'
import companyUserAuth from './companyUser.auth.js';

const router = express.Router();

router.post('/', auth.authenticate, async function (request, response) {
  try {
    const companyUser = {
      ...request.body,
      password: await auth.hashPassword(request.body.password),
      created_by: request.user.id,
      created_at: new Date(),
      modified_by: request.user.id,
      modified_at: new Date()
    }

    await new companyUserModel(companyUser).save();
    response.status(200).json({message: "User Saved"})
  } catch (error) {
    console.log(error);
    response.status(404).json({message: "Error in Saved User"})
  }
});

router.get('/', auth.authenticate, async (request, response) => {
  try {
    const companyUsers = await companyUserModel.find()
                            .populate('created_by', 'name')
                            .populate('modified_by', 'name')
                            .populate('manager_id', 'name')
                            .populate('company_id', 'name');

    const companyUsersData = companyUsers.map(companyUser => ({
        id: companyUser._id,
        company: companyUser.company_id?.name || null,
        name: companyUser.name,
        email: companyUser.email,
        phone: companyUser.phone,
        login: companyUser.login,
        role: companyUser.role,
        gender: companyUser.gender,
        manager: companyUser.manager_id?.name || null,
        photo_sha: companyUser.photo_sha,
        state: companyUser.state,
        created_at: companyUser.created_at,
        created_by: companyUser.created_by?.name || null,
        modified_at: companyUser.modified_at,
        modified_by: companyUser.modified_by?.name || null
    }));

    response.status(200).json(companyUsersData);
  } catch (error) {
    console.error('Error fetching companyUsers:', error);
    response.status(500).json({ message: 'Failed to get all companyUsers', error: error.message });
  }
});


router.get('/:id', auth.authenticate, async (request, response) => {
  const { id } = request.params;

  try {
    const companyUser = await companyUserModel.findById(id)
                            .populate('created_by', 'name')
                            .populate('modified_by', 'name')
                            .populate('manager_id', 'name')
                            .populate('company_id', 'name');

    if (!companyUser) {
      return response.status(404).json({ message: 'Company User not found' });
    }

    const companyUserData = {
        id: companyUser._id,
        company: companyUser.company_id?.name || null,
        name: companyUser.name,
        email: companyUser.email,
        phone: companyUser.phone,
        login: companyUser.login,
        role: companyUser.role,
        gender: companyUser.gender,
        manager: companyUser.manager_id?.name || null,
        photo_sha: companyUser.photo_sha,
        state: companyUser.state,
        created_at: companyUser.created_at,
        created_by: companyUser.created_by?.name || null,
        modified_at: companyUser.modified_at,
        modified_by: companyUser.modified_by?.name || null
    };

    response.status(200).json(companyUserData);
  } catch (error) {
    console.error('Error fetching companyUser:', error);
    response.status(500).json({ message: 'Failed to get some companyUser', error: error.message });
  }
});

router.put('/:id', auth.authenticate, async (request, response) => {
  const { id } = request.params;

  try {
    const companyUser = await companyUserModel.findById(id);

    if (!companyUser) {
      return response.status(404).json({ message: 'Company User not found' });
    }

    const updatedCompanyUser = {
      ...request.body,
      modified_by: request.user.id,
      modified_at: new Date()
    };

    await companyUserModel.findByIdAndUpdate(id, updatedCompanyUser);

    response.status(200).json({ message: 'Company User updated' });
  } catch (error) {
    console.error('Error updating companyUser:', error);
    response.status(500).json({ message: 'Failed to update companyUser', error: error.message });
  }
});

router.delete('/:id', auth.authenticate, async (request, response) => {
  const { id } = request.params;

  try {
    const companyUser = await companyUserModel.findById(id);

    if (!companyUser) {
      return response.status(404).json({ message: 'Company User not found' });
    }

    await companyUserModel.findByIdAndDelete(id);

    response.status(200).json({ message: 'Company User deleted' });
  } catch (error) {
    console.error('Error deleting companyUser:', error);
    response.status(500).json({ message: 'Failed to delete companyUser', error: error.message });
  }
});

router.post('/login', companyUserAuth.login);


export default router;