import express from 'express';
import companyModel from './company.model.js';

const router = express.Router();

router.post('/', async function (request, response) {
  try {
    const company = {
      ...request.body,
      created_at: new Date(),
      modified_at: new Date()
    }

    await new companyModel(company).save();
    response.status(200).json({message: "Company Saved"})
  } catch (error) {
    console.log(error);
    response.status(404).json({message: "Error in Saved Company"})
  }
});

router.get('/', async (request, response) => {
  try {
    const companies = await companyModel.find();
    response.status(200).json(companies);
  } catch (error) {
    console.error('Error fetching companies:', error);
    response.status(500).json({ message: 'Failed to get all companies', error: error.message });
  }
});

router.get('/:id', async (request, response) => {
  const { id } = request.params;

  try {
    const company = await companyModel.findById(id);

    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    response.status(200).json(company);
  } catch (error) {
    console.error('Error fetching company:', error);
    response.status(500).json({ message: 'Failed to get some company', error: error.message });
  }
});

router.put('/:id', async (request, response) => {
  const { id } = request.params;
  const newData = request.body;

  try {
    const company = await companyModel.findByIdAndUpdate(
      id,
      {...newData, modified_at: new Date()}
    );

    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    response.status(200).json({ message: 'Company updated', data: company });
  } catch (error) {
    console.error('Error fetching company:', error);
    response.status(500).json({ message: 'Failed to update company', error: error.message });
  }
})

router.delete('/:id', async (request, response) => {
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