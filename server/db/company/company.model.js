import mongoose from "mongoose";

const companiesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  note: {
    type: String
  },
  state: {
    type: String,
    required: true
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'systemUsers',
    required: true
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now
  },
  modified_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'systemUsers',
    required: true
  },
  modified_at: {
    type: Date,
    required: true,
    default: Date.now
  }
});

const companyModel = mongoose.model('companies', companiesSchema);

export default companyModel;