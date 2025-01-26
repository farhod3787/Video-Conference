import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../config/config.js';

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
}

const isValidPassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
}

const authenticate = (request, response, next) => {
  try {
    const token = request.header('Authorization');

    if (!token) return response.status(401).json({ message: 'No token provided' });

    try {
      const decodes = jwt.verify(token, config.JWT_SECRET);
      request.user = decodes;
      next();
    } catch (error) {
      console.error('Error in authentication:', error);
      response.status(403).json({ message: 'Forbidden' });
    }
  } catch (error) {
    console.log('Error in authentication:', error);
    response.status(403).json({ message: 'HEader Authorization Not Found'});
  }
};

export default {
  hashPassword,
  isValidPassword,
  authenticate
};