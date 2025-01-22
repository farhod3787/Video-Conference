import mongoose from "mongoose";

const systemUsersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  login: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const systemUserModel = mongoose.model('systemUsers', systemUsersSchema);

export default systemUserModel;