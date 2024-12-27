import mongoose, {Schema} from "mongoose";

const creditSchema = new mongoose.Schema({
        user:{
            type: Schema.Types.ObjectId,
            ref: 'users',
            required:true
        },
        name:{
           type: String,
           required:true,
           trim:true,
           unique:true 
        },
        account:{
            type:String,
            required: true,
            trim:true,
        },
        limit:{
            type:Number,
            required: true
        },
        interestRate:{
            type:Number,
            required:true
        },
        billingCycleStart: {
            type: Date, 
            required: true
          },
        billingCycleEnd: {
            type: Date, 
            required: true
          },
},{timestamps:true} );

const Credit = mongoose.model('credit', creditSchema);
export default Credit;