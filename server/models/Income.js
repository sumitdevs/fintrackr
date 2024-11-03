import mongoose, {Schema} from 'mongoose';

const incomeSchema = new mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    account: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    notes: { type: String },
  }, { timestamps: true });
  
const Income = mongoose.model('income', incomeSchema);
export default Income;