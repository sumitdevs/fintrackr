import mongoose,{Schema} from 'mongoose';

const budgetSchema = new mongoose.Schema({
    amount: { type: Number,required:true},
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    account: { type: String,required:true},
    category: { type: String,required:true},
    date: { type: Date, default: Date.now },
    timeFrames: {
        type: String,
        enum: ['monthly', 'weekly'], 
      },
});

const Budget = mongoose.model('budget', budgetSchema);
export default Budget;
