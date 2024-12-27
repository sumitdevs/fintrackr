import mongoose from 'mongoose';
import {Schema} from 'mongoose';

const transactionSchema = new mongoose.Schema({
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'users', 
        required: true 
    },
    account: { 
        type: String,
        required: true
    },
    category: { 
        type: String,
        required: true
    },
    amount: {
         type: Number, 
         required: true
        },
    date: {
        type: Date, 
        default: Date.now 
    },
    time:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    notes: { 
        type: String 
    },
}, { timestamps: true });

const Transaction = mongoose.model('transaction', transactionSchema);
export default Transaction;