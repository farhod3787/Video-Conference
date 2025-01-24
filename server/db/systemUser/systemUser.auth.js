import jwt from 'jsonwebtoken';
import systemUserModel from './systemUser.model.js';
import auth from '../middleware/auth.js';
import config from '../../config/config.js';

const login = async (request, response) => {
  const { login, password } = request.body;

  const user = await systemUserModel.findOne({ login: login });

  if (!user) return response.status(404).json({ message: 'User not found' });

  if (!auth.isValidPassword(password, user.password)) return response.status(401).json({ message: 'Invalid Credentials' });

  const token = jwt.sign({ id: user._id }, config.JWT_SECRET, { expiresIn: config.JWT_EXPIRATION });

  response.status(200).json({ 'token': token });
};

export default login