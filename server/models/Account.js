// models/Account.js
import mongoose from 'mongoose';
import {Schema} from 'mongoose';
const accountSchema = new mongoose.Schema({
  accountName:{type:String, required: true, unique: true },
  balance: { type: Number, default: 0 },
  userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  createdAt: { type: Date, default: Date.now },
  accountDesc:{type:String, required: false},
});

const Account = mongoose.model('Account', accountSchema);

export default Account;
