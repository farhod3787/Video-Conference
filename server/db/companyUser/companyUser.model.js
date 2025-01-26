import mongoose from "mongoose";

const companyUsersSchema = new mongoose.Schema({
  company_id : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'companies',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  phone: {
    type: String
  },
  login: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'user']
  },
  gender: {
    type: String,
    required: true,
    enum: ['M', 'F']
  },
  manager_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'companyUsers'
  },
  photo_sha: {
    type: String
  },
  state: {
    type: String,
    required: true
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'companyUsers',
    required: true
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now
  },
  modified_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'companyUsers',
    required: true
  },
  modified_at: {
    type: Date,
    required: true,
    default: Date.now
  }
});

const companyModel = mongoose.model('companyUsers', companyUsersSchema);

export default companyModel;