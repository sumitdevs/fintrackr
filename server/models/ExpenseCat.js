import mongoose from "mongoose";

const catSchema = new mongoose.Schema({
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

const ExpenseCat = mongoose.model('ExpenseCat', catSchema);

export default ExpenseCat;
