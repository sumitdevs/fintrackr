import mongoose from "mongoose";

const connectDB = async ()=>{
    try{
       let res = await mongoose.connect(process.env.MONGO_URI);
       console.log('connected to mongoDB');
    }catch(error){
        console.log(error);
    }
}

export default connectDB;