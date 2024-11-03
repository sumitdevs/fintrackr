import mongoose, {Schema} from 'mongoose';

const expenseSchema = new mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    account: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    notes: { type: String },
  }, { timestamps: true });
  
const Expense = mongoose.model('expense', expenseSchema);
export default Expense;