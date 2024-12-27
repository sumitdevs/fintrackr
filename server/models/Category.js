import mongoose, {Schema} from 'mongoose';

const categorySchema = new mongoose.Schema({
    userId: { 
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true 
    },
    type: {
        type: String,
        required: true,
        enum: ["income", "expense"],
    },
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    subCat: [{
        type: String,
        trim: true
    }],
});

const Category = mongoose.model('category', categorySchema);
export default Category;