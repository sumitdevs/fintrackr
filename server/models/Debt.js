import mongoose, {Schema} from "mongoose";

const debtSchema = new mongoose.Schema({
  user:{
    type: Schema.Types.ObjectId,
    ref: 'users',
    required:true
  },
  value: {
    type: Number,
    required: true, 
    min: 0,
  },
  account: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  paybackDate: {
    type: Date,
    required: false,
  },
  personName: {
    type: String,
    required: true,
    trim: true,
  },
  notes: {
    type: String,
    required: false,
    trim: true,
  },
  frequency: {
    type: String,
    enum: ['default', 'weekly', 'monthly'], 
    default: 'default',
  },
  type: {
    type: String,
    required: true,
    enum: ['debt', 'credit'],
  },
});

const Debt = mongoose.model('debt', debtSchema);

export default Debt;