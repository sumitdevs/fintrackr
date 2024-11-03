import mongoose,{Schema} from 'mongoose';

const budgetSchema = new mongoose.Schema({
    amount: { type: Number,required:true},
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    account: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    date: { type: Date, default: Date.now },
    timeFrames: {
        type: [String],
        enum: ['month', 'week', 'year'], 
        default: ['month', 'week', 'year'], 
      },
});

const Budget = mongoose.model('budget', budgetSchema);
export default Budget;
