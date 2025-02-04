import express from 'express';
import languageModel from './language.model.js';

const router = express.Router();

router.post('/', async (request, response) => {
  try {
    const language = {
      ...request.body
    }

    // When Create a new Language, should add new column for Translations Table

    await new languageModel(language).save();

    response.status(200).json({message: "Language Saved"})
  } catch (error) {
    console.log(error);
    response.status(404).json({message: "Error in Saved Language"})
  }
});

router.get('/', async (request, response) => {
  try {
    const languages = await languageModel.find();

    const languagesData = languages.map(language => ({
      id: language._id,
      name: language.name,
      code: language.code
    }));

    response.status(200).json(languagesData);
  } catch (error) {
    console.error('Error fetching languages:', error);
    response.status(500).json({ message: 'Failed to get all languages', error: error.message });
  }
});

export default router;