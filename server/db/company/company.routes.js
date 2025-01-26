import express from 'express';
import mongoose from 'mongoose';
import companyModel from './company.model.js';
import companyUser from '../companyUser/companyUser.model.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/', auth.authenticate,  async function (request, response) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const company = {
      ...request.body,
      created_by: request.user.id,
      created_at: new Date(),
      modified_by: request.user.id,
      modified_at: new Date()
    }

    const newCompany = await new companyModel(company).save();

    // Here should be a new Company User for admin Role
    const companyAdmin = {
        company_id: newCompany._id,
        name: company.name,
        login: company.name,
        password: await auth.hashPassword(company.name),
        role: 'admin',
        gender: 'M',
        state: 'A',
        created_by: request.user.id,
        modified_by: request.user.id
    }

    await new companyUser(companyAdmin).save();

    await session.commitTransaction();
    response.status(200).json({message: "Company Saved"})
  } catch (error) {
    await session.abortTransaction();
    console.log(error);
    response.status(404).json({message: "Error in Saved Company"})
  } finally {
    session.endSession();
  }
});

router.get('/', auth.authenticate, async (request, response) => {
  try {
    const companies = await companyModel.find()
                            .populate('created_by', 'name')
                            .populate('modified_by', 'name');

    const companiesData = companies.map(company => ({
        id: company._id,
        name: company.name,
        code: company.code,
        note: company.note,
        state: company.state,
        created_at: company.created_at,
        created_by: company.created_by?.name || null,
        modified_at: company.modified_at,
        modified_by: company.modified_by?.name || null
    }));

    response.status(200).json(companiesData);
  } catch (error) {
    console.error('Error fetching companies:', error);
    response.status(500).json({ message: 'Failed to get all companies', error: error.message });
  }
});

router.get('/:id', auth.authenticate, async (request, response) => {
  const { id } = request.params;

  try {
    const company = await companyModel.findById(id).populate('created_by', 'name').populate('modified_by', 'name');

    if (!company) {
      return response.status(404).json({ message: 'Company not found' });
    }

    const companyData = {
      id: company._id,
      name: company.name,
      code: company.code,
      note: company.note,
      state: company.state,
      created_at: company.created_at,
      created_by: company.created_by?.name || null,
      modified_at: company.modified_at,
      modified_by: company.modified_by?.name || null
    }

    response.status(200).json(companyData);
  } catch (error) {
    console.error('Error fetching company:', error);
    response.status(500).json({ message: 'Failed to get some company', error: error.message });
  }
});

router.put('/:id', auth.authenticate, async (request, response) => {
  const { id } = request.params;
  const newData = request.body;

  try {
    const company = await companyModel.findByIdAndUpdate(
      id,
      {
        ...newData,
        modified_by: request.user.id,
        modified_at: Date.now()
      }
    );

    if (!company) {
      return response.status(404).json({ message: 'Company not found' });
    }

    response.status(200).json({ message: 'Company updated', data: company });
  } catch (error) {
    console.error('Error fetching company:', error);
    response.status(500).json({ message: 'Failed to update company', error: error.message });
  }
})

router.delete('/:id', auth.authenticate, async (request, response) => {
  const { id } = request.params;

  try {
    const company = await companyModel.findByIdAndDelete(id)

    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    response.status(200).json({ message: 'Company deleted' });
  } catch (error) {
    console.error('Error fetching company:', error);
    response.status(500).json({ message: 'Failed to delete company', error: error.message });
  }
})

export default router;