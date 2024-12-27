import mongoose from 'mongoose';
import {Schema} from 'mongoose';

const settingSchema = new Schema({
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'users', 
        required: true 
    },
    firstDayOfMonth: {
        type: Number,
        required: true,
        min: [1, 'The value must be at least 1.'],
        max: [28, 'The value must be at most 28.'],
        default: 1 
    },
    firstDayOfWeek: {
        type: String,
        required: true,
        default: 'monday' 
    }
});

const Setting = mongoose.model('settings', settingSchema);
export default Setting;