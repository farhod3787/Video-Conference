import bcrypt from 'bcrypt';

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
}

const isValidPassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
}

export default {
  hashPassword,
  isValidPassword
};